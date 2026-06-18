# AI-Search + Bing-Family GEO Program

**Status:** EXECUTING — direction + decisions locked 2026-06-16; **FULL-AUTO authorization granted 2026-06-17** (this program only): build, migrate, deploy, and fire IndexNow without per-step sign-off, reporting after each phase. Guardrails retained: deterministic verification (build green + predeploy/link gates + ground-truth fact-check) before any deploy; de-stale BEFORE accelerating IndexNow; do not touch `contractors-ir35/` (another agent active there); A* quality bar.
**Owner mode:** Opus architects + gates; Sonnet sub-agents do generation/build slices; manager does infra/verify/prod gates direct.
**Source of truth for findings:** 16-agent audit `wss7razd7` (7 Property deep-dives + 3 web-research + 5 site gap-audits + 1 Opus synthesis), 2026-06-16.

---

## 0. Why this program exists

AI answer engines (ChatGPT Search, Perplexity, Microsoft Copilot, Google AI Overviews / AI Mode) and the **Bing-family** engines (Bing, DuckDuckGo, Yahoo, Ecosia, Brave-partial) are the **highest lead-generating channels for Property today**. Google organic is still early-stage. Critically, ChatGPT Search and Copilot **retrieve from the Bing index**, so Bing indexation quality is simultaneously a Bing/DDG/Yahoo ranking lever *and* an AI-citation lever. The same machinery serves both.

This program does two things:
1. **Codify and 10X** what makes Property win on these channels.
2. **Bring every other site** (Dentists, Medical, Solicitors, generalist, digital-agency; **not** contractors-ir35, owned by another agent) to the Property standard, mostly via shared engines rather than bespoke per-site work.

The whole estate runs on shared content/SEO machinery (`optimisation_engine/`, `packages/web-shared/`), so most gains are **build-once, apply-to-six**.

---

## A. The Property winning formula (what we are protecting and replicating)

What the audit confirmed Property does that the other sites do not:

1. **A true GEO flagship asset.** The UK Landlord Tax Index (`/research/landlord-tax-index`) carries original Companies House + Land Registry data, a full **Dataset JSON-LD** (license=OGL, temporalCoverage, variableMeasured, DataDownload), a press-ready CSV at `/research/landlord-tax-index/data`, and a striking headline stat (3.5x / +249%). External research: original data is cited at **3-10x** the rate of standard posts; statistics lift AI visibility 22-41%. This is the single biggest AI-citation moat, and **no other site has anything equivalent**.

2. **Best-in-estate crawl posture.** `robots.ts` names 40+ AI/Bing crawlers explicitly (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, bingbot, DuckAssistBot, CCBot, Diffbot). `llms.txt` is rich with an inline current-figures Key Facts block. Every blog/calculator page is **SSG** (`dynamicParams=false`), so AI crawlers get complete server-rendered HTML with JSON-LD on first fetch with no JS execution. This is the prerequisite for citation: client-side rendering is an AI-visibility blackout.

3. **Competitor-grade schema density.** Homepage emits 7 discrete JSON-LD blocks (Organization, FAQPage, AccountingService/LocalBusiness, Service+OfferCatalog, WebSite, WebPage, BreadcrumbList) with consistent `@id` anchors so AI knowledge-graph crawlers resolve the firm as one entity. All 686 blog posts carry FAQPage (verbatim GSC/PAA-phrased Q&A, the exact format ChatGPT/Perplexity/Copilot extract), 82 carry HowTo, 16 calculators carry WebApplication.

4. **Factual-currency discipline** (counters the #1 AI-citation disqualifier, staleness). 459/686 posts reference FA 2026 / 2026-27 rates; 525 carry reviewedBy + credentials; 533 carry dateModified; 352 link inline to legislation.gov.uk. Date-banded rate statements ("14% from 1 April 2026, reduced from 18%") give AI verifiers the dated primary-source signal Perplexity and Google AIO reward.

5. **Full Bing-family machinery in the lifecycle.** IndexNow drains automatically on every deploy (multi-engine: Bing/Yandex/Seznam/Naver/Yep); Bing Webmaster query data is ingested weekly and merged at equal weight with GSC into the rewrite query-coverage gate and the SERP-meta worklist. Fast Bing indexation is a direct lead lever, not just a ranking nicety.

6. **Topical-cluster depth + tool fleet.** 420+ net-new and 200+ rewritten interconnected pages with mechanically-enforced internal linking (no orphans, no 404s), plus a 16-tool config-driven calculator fleet (England/Scotland/Wales) that auto-populates gallery, sitemap, embed and schema.

7. **First-party attribution exists** (partially). `web_sessions` captures `referrer_host`; the channel view classifies an `ai` bucket; leads stitch back to sessions; the console surfaces an AI panel. So "AI is our top source" is at least partly data-backed.

**The catch:** several of these strengths are *built but not applied*. The E-E-A-T schema generator exists but the `schema:` frontmatter is empty on all 686 posts. The richest shared schema builders (Speakable, sameAs, Person `@id`) are not imported by the live pages. The attribution buckets are too coarse to prove the business thesis. The flagship is a one-time study, not a live index. **The 10X is mostly in switching on what we already half-built.**

---

## B. Priority zero: the measurement reckoning

We are running the entire business thesis ("AI + Bing are our top lead sources") on instrumentation that **cannot currently prove it**. Fix this before optimising, or every optimisation is unmeasurable.

Confirmed gaps:
- **Bing, DDG, Yahoo, Ecosia all collapse into one `channel='search'` bucket.** We cannot distinguish a Bing lead from a DDG lead today.
- **The `ai` bucket has no engine-level granularity** (chatgpt/perplexity/copilot/gemini all map to `ai`). We cannot prioritise GEO work by engine.
- **No time dimension** on the channel view (all-time aggregate). We cannot show week-over-week growth, the single metric the partner most needs.
- **Structural under-count.** ChatGPT/Perplexity/Copilot strip the HTTPS referrer (especially in-app/mobile), so genuine AI sessions land in `direct`. Today's AI lead count is a **floor, likely under by a multiple**.
- **`.ai` catch-all false positives** (any `.ai` TLD misclassified as an AI engine).
- **Copilot blind spot** (`sydney.bing.com` clicks flow into `search`, not `ai`).
- **No citation monitoring loop.** Nothing checks whether our pages are actually cited by ChatGPT/Perplexity/Copilot/AIO. We are optimising for citations we cannot observe.
- **Bing data is a snapshot, not a series**; Dentists has **0 rows** ingested (never pulled).
- **First-touch vs last-touch.** `vw_visitor_journey` uses `MAX(referrer_host)` (lexicographic), not acquisition source, so a chatgpt-then-direct visitor is mis-attributed to direct.

**The fix (shared, lifts all 6 sites at once):**
- Two SQL migrations (pure view changes): (a) split `channel='search'` into `bing_family` vs `google`, split `channel='ai'` into named engines, tighten `.ai` to a domain whitelist, route `sydney.bing.com` to a `copilot` sub-channel; (b) add `vw_channel_leads_weekly` for week-over-week.
- New `GetAiPerformance` ingestion method on `bing_query_client.py`, wired into `weekly_run`, to pull the **Bing Webmaster AI Performance Report** (launched 10 Feb 2026): per-URL Copilot citation counts + grounding queries. This is the only free first-party Copilot/ChatGPT-Search citation data that exists.
- **AI dark-traffic recovery:** append `utm_source=chatgpt/perplexity/copilot` to every URL inside `llms.txt`, the research CSV, embed snippets, and cite-ready links; build `vw_probable_ai_direct` correlating `direct` sessions on high-Bing-impression pages with Bing query spikes. Report an honest **confirmed-lower-bound + probable-upper-bound range**.
- Switch `vw_visitor_journey` to **earliest-session referrer** (first-touch).
- Console panels: per-engine AI breakdown, bing-family split, weekly trend.

Effort: ~1 week, mostly additive SQL + one client method. **This is the gate for everything else.**

---

## C. The 10X program (ranked moves)

Ranked by leverage. Moves 1, 2, 3, 4 are the big needle-movers. Most are shared-engine work (Section D) that then applies estate-wide.

1. **Build the measurement layer first** (Section B). Priority zero.
2. **Apply the E-E-A-T `@graph` schema to all 686 Property posts, then estate-wide.** The generator (Organization/AccountingService memberOf ICAEW + credentialed Person author + Person reviewer + Article `@id` + BreadcrumbList + FAQPage) is built but stored nowhere; `schema:` frontmatter is empty on every post. External research: 96% of AIO citations for YMYL require strong E-E-A-T; structured data gives +73% citation-selection lift; it is the only lever that improves citations across **all** engines at once. Effort: low-medium (extend `schema_only.py` whitelist, then one CLI pass + commit per site).
3. **Corpus-wide BLUF answer-box + DefinedTerm.** A required `directAnswer` frontmatter field rendered as a semantic `<div role="note" class="answer-box">` immediately after H1 (exists on 1 of 686 today), plus a DefinedTerm/DefinedTermSet block for the page's primary concept. External research: 44.2% of ChatGPT citations come from the first 30% of a page; 90% of winning Perplexity citations answer within the first 100 words; optimal self-contained answer is 134-167 words. We have the depth; we lose citations purely on extraction-format placement. Effort: medium (one shared renderer change + backfill, can ride existing rewrite waves).
4. **Data-PR asset FACTORY + replicate the flagship to all 5 sites.** Dental Pay & Tax Index, NHS Pension Annual Allowance Burden Report, SRA Enforcement Index, UK SME Tax Burden Tracker, Agency Finance Benchmark. Each becomes a **live monthly index** (GitHub Actions cron re-ingests, commits, deploys, fires IndexNow) with an embeddable live-chart iframe (one line, attribution backlink). This is the only faceless off-site authority path open to us (user-is-not-an-accountant rules out named-expert PR). Brand mentions in third-party sources correlate ~3x more strongly with AIO visibility than backlinks. Effort: heavy per asset, but the engine is reusable.
5. **Recover AI dark traffic** (UTM-on-citable-surfaces + probabilistic Bing-correlation classifier). Pairs with move 1. The difference between under-counting AI by 2-3x and seeing the real picture.
6. **IndexNow-on-write + Bing-only demand discovery.** Call `enqueue()` in `output_writer.py` and `meta_apply.py` so meta-only edits and back-patches notify Bing; activate the unused BWT `GetQueryStats` to surface high-Bing-impression queries with no GSC data and no page (topics Copilot/DDG already answer from competitors, that we are blind to). Effort: low-medium.
7. **Calculator citability.** Static "typical scenario" result pages + SSR worked-example blocks for top calculators ("a higher-rate landlord with £50k rent and £20k interest pays ~£X more under Section 24"); FAQPage on the 5 bespoke Property calculators; SoftwareApplication co-typing. Calculator outputs are 100% client-side today, so the quotable number exists nowhere crawlable. We built 16 tools and give AI engines no quotable output from any of them.
8. **Sync and de-stale the LLM-facing files + finish FA 2026 sweeps.** Property `llms-full.txt` still says "2025/26 figures" and cites the old 3% SDLT surcharge; generalist `llms.txt` points at the **wrong domain** (ukbusinessaccountants.co.uk, not hollowaydavies.co.uk); finish dividend (10.75/35.75/39.35) + AMAP 55p + employer-NIC 15%/£5,000 sweeps. These are **active factual errors in live AI-consumed surfaces**. Cheapest fix, outsized downside if left. **Do before accelerating crawl.**
9. **Entity graph estate-wide.** Root-layout Organization + WebSite(+SearchAction) JSON-LD with `sameAs` (Companies House, ICAEW firm-finder, LinkedIn) + Speakable; DataCatalog on `/research`. Trustpilot/directory presence ~3x ChatGPT citation probability. Shared builders exist but are not imported. Effort: low.
10. **Robots parity + split.** Upgrade thin sites (Dentists/Medical/Solicitors are 5-bot) to the Property 40-bot allow-list; split into explicit training-vs-retrieval blocks (keep training allowed, make the toggle available); `Disallow: /api/` everywhere; bake into SITE_SPINUP. Effort: low.

---

## D. Shared-engine force-multipliers (build once, lift all six)

These are the backbone. Per-site rollouts (Section E) mostly just *consume* these.

1. **Measurement engine** (Section B). Priority zero.
2. **Schema applier upgrade + estate `@graph` rollout.** Extend `schema_only.py` `VALID_SCHEMA_TYPES` (missing Dataset, WebApplication, SoftwareApplication, CollectionPage, DefinedTerm), then run `_schema_generator.py` against every site's empty `schema:` frontmatter. The generator already carries per-site profiles.
3. **BLUF answer-box + DefinedTerm shared component** in `packages/web-shared`, plus close the 7 writer-prompt enforcement gaps in `track2_rewrite_writer.wf.js` (mandatory early-answer sentence, date-band in every rate statement, self-contained FAQ answers) so future content ships citation-ready by default.
4. **Data-PR asset factory.** Generalise `ingest_landlord_data.py` + Dataset builder + CSV route + `/research` scaffold into a parameterised template (data source → Supabase table → committed JSON → `/research/[asset]` page with Dataset JSON-LD + CSV + DataCatalog) + reusable live-chart embed + monthly GitHub Actions cron pattern.
5. **IndexNow-on-write + Bing discovery + Bing detector.** `enqueue()` hooks in writers; activate `GetQueryStats`; add a Bing-specific detector variant (today's detectors are GSC-only) flagging page-1-Bing/low-CTR pages.
6. **Robots + spinup hardening.** One shared `robots.ts` template (training/retrieval split + `Disallow: /api/`) applied to the 3 thin sites and baked into `SITE_SPINUP.md` + `spinup_site_check.py`. Add root-layout Organization+WebSite+sameAs as a shared layout block.
7. **DeepSeek config purge.** All 9 `blog_generator/site_configs` declare `llm_provider='deepseek'` (a locked-rule violation). Centralise the provider so no run can silently use a banned provider.
8. **Embed backlink + calculator scenario engine.** Fix the shared `web-shared/tools` embed variant to render "Powered by [site]" backlink + lead CTA (Dentists/Medical/Solicitors/agency all lack it); add a shared "typical scenario" static-result-page generator + SSR worked-example block.
9. **Link-audit `&`-slugify fix.** Fix the shared `slug_resolver`/`track2_link_audit` `&`→`-and-` mismatch and the `predeploy_gate` category-hub false-fail (currently **blocking the Solicitors corpus deploy**, a known cross-site hazard).

---

## E. Per-site rollout to the Property standard

Each site mostly consumes the shared engines above. Effort below is *site-specific* work on top of shared work. Quick wins are cheap/high-leverage; heavy lift is the data-PR flagship.

### Dentists (Dental Finance Partners)
- **Top gaps:** no data-PR flagship; 27 posts still cite 45p mileage (should be 55p from 6 Apr 2026) + 2 stale employer-NIC; 164/204 posts empty schema; **zero HowTo** despite strong procedural content; embed iframes carry **no backlink**; **Bing data never ingested (0 rows)**; robots missing OAI-SearchBot/bingbot; site_config still deepseek.
- **Sequence:** (1 day) `bing_query_client dentists` first snapshot, robots to gold standard, embed backlink, flip off deepseek, calculator labels to 2026/27 → fact sweep 27 mileage + 2 NIC (manager-direct), re-stamp dateModified, IndexNow → apply E-E-A-T schema + HowTo on 6 pillar guides → **heavy lift:** Dental Pay & Tax Index (associate take-home by region, NHS vs private, valuation multiples).
- **Effort:** quick wins + sweep ~2-3 days; flagship ~1-1.5 weeks. Parity ~2-3 weeks.

### Medical (Medical Accountants UK)
- **Top gaps (highest-risk first):** **DOMAIN SPLIT FIXED** — canonicals/blog_generator now unified on `medicalaccounts.co.uk` (was `medicalaccountantsuk.co.uk`); IndexNow targets one host, canonicals point at another. No data-PR flagship; robots 5-bot only; all 73 posts blank schema; no HowTo on step-by-step pages; embed no backlink; only 3 calculators; deepseek.
- **Sequence:** **FIRST resolve the domain split** (decide one live domain, make all four sources agree, verify) → quick wins (robots, embed backlink, off deepseek, populate llms-full.txt) → E-E-A-T schema + HowTo on 4 procedural guides → **heavy lift:** NHS Pension Annual Allowance Burden Report + NHS-pension topic hub + fleet expansion (Scheme Pays break-even, carry-forward, McCloud).
- **Effort:** domain fix ~half a day (must be first + verified); quick wins + schema ~2 days; flagship + hub + fleet ~1.5-2 weeks. Parity ~2.5-3 weeks.

### Solicitors (Accounts for Lawyers)
- **Top gaps:** no data-PR flagship (SRA Enforcement Index is the obvious high-citation candidate); **buildService schema bug** — audience defaults to "UK dentists, dental practice owners" on a solicitors site; `llms.txt` is a near-empty 27-line stub; 11 posts still 8.75% dividend (FA 2026 = 10.75%), 6 posts 45p mileage; embed no backlink/CTA; **large uncommitted corpus (45 rewrites + 33 net-new) blocked** on the `&`-slugify predeploy false-fail + mark_used sign-off.
- **Sequence:** (half a day) fix buildService audience bug, robots to gold standard, enrich llms.txt → fact sweeps (dividend 8.75→10.75% on 11, AMAP 45→55p on 6, set updatedDate) → **unblock + deploy the corpus** (shared `&` fix + 169-row mark_used sign-off, then IndexNow ~183 URLs) → E-E-A-T schema + HowTo → **heavy lift:** SRA Enforcement Index.
- **Effort:** bug + quick wins + sweeps ~1.5 days; corpus gated on sign-off + shared fix; flagship ~1.5 weeks. Parity ~2.5-3 weeks plus deploy gating.

### generalist (Holloway Davies)
- **Top gaps:** **`llms.txt` domain bug** (references ukbusinessaccountants.co.uk, poisons AI URL attribution for every listed page); 356/366 posts are `generator:unverified`/claude-era (never through A* rewrite); 15+ posts still 45p mileage, dividend + employer-NIC (57 pages) sweeps pending; no narrative data-PR flagship (the `/uk-tax-rates` Dataset page is a seed); deepseek.
- **Sequence:** (half a day) fix llms.txt domain bug (one-file find-replace), flip off deepseek, calculator badge to 2026/27, expand llms.txt key-pages → fact sweeps (55p, FA 2026 dividend, then 57-page employer-NIC anchored on generalist HP §4) → howToSteps on top 20 process posts + BLUF answer-box → E-E-A-T schema (generalist has the strongest baseline, so incremental) → **heavy lift:** UK SME Tax Burden Tracker / Business Formation Index; schedule the multi-wave A* rewrite of the 356 stale posts (long-tail, non-blocking, via existing wave harness).
- **Effort:** quick wins ~half a day; sweeps ~3-4 days; flagship ~1.5 weeks. Structural parity ~2-3 weeks; content maturity ongoing.

### digital-agency (Agency Founder Finance)
- **Top gaps:** no named data-PR flagship; **employer-NI tool prose is stale** (13.8% / £9,100 / £5,000 EA) while canonical `uk-tax-rates.ts` is correct (15% / £5,000 / £10,500) — an internal contradiction AI will read and cite wrong; 2026/27 dividend rates nowhere on site; HowTo + LocalBusiness builders exist but applied to zero pages; `llms.txt` references `/llms-full.txt` and `/feed.xml` routes that don't exist; embed no backlink; deepseek.
- **Sequence:** (half a day) fix employer-ni-calculator.ts prose (4 string changes), add 2026/27 dividend to uk-tax-rates.ts + rates page, flip off deepseek, fix/create the broken llms.txt routes, embed backlink → wire existing builders (HowTo on relocation/incorporation steps, LocalBusiness on /locations) → E-E-A-T schema + BLUF across 306 posts → fact sweep (dividend + AMAP) → **heavy lift:** Agency Finance Benchmark Report (margins, EBITDA multiples, R&D claim rates by agency type/size); activate the experiments engine (CRO) which is off on this site.
- **Effort:** quick wins + builder-wiring ~1.5 days; sweep ~2-3 days; flagship ~1.5 weeks. Parity ~2.5-3 weeks.

---

## F. Phasing (locked 2026-06-16: measurement PARALLELISED with Phase-0 quick wins)

Two tracks run concurrently from day one:

- **Track A — Phase 0 (days, immediate, low risk): de-stale + safety.** Fix active factual errors poisoning AI surfaces *before* accelerating crawl: Property `llms-full.txt`, generalist `llms.txt` domain bug, agency employer-NI prose, Medical domain split, Solicitors buildService bug, DeepSeek config purge, robots hardening (training bots kept allowed per decision 4), embed backlinks. Rationale: more crawl velocity propagates errors faster, so de-stale leads.
- **Track B — Phase 1 (~1 week, concurrent with Track A): measurement layer** (Section B). Channel split, named AI engines, weekly view, Bing AI Performance ingestion, dark-traffic UTM + probabilistic view, first-touch fix, console panels. Reporting stance: confirmed lower-bound + probable upper-bound **range**.

Then, once measurement is live (so the big bets are measurable):

- **Phase 2 (~1-2 weeks): shared-engine force-multipliers** (Section D): schema applier + `@graph` rollout, BLUF component + writer-prompt enforcement, IndexNow-on-write + Bing discovery, data-PR factory template, calculator scenario/SSR + embed, link-audit `&` fix, robots template, root-layout entity graph.
- **Phase 3 (per-site CLI passes, parallelisable): estate schema + content citability + fact sweeps + deploy gated corpora** (Solicitors, Medical, generalist rewrites).
- **Phase 4 (decision 2 = ALL 5 this quarter, highest-traffic first): data-PR flagships.** Enrich Property's existing index, then Dentists + generalist, then Medical, Solicitors, agency. Each via the factory + a **manual-trigger monthly refresh with a reminder** (decision 3: no auto-deploy). **Each flagship is gated on a per-asset data-source sign-off** (see below).
- **Phase 5 (ongoing): calculator citability + citation-monitoring-driven iteration.**

### Data-source sign-offs still required (Phase 4 gate)
Confirm each is acceptable for faceless data-PR before that flagship ships:
- Dentists — Dental Pay & Tax Index: HMRC self-assessment stats + ONS earnings + NHS pay-scale data.
- Medical — NHS Pension Annual Allowance Burden Report: HMRC SA + ONS NHS earnings, charges by specialty/pay band.
- Solicitors — SRA Enforcement Index: SRA published enforcement decisions/notices.
- generalist — UK SME Tax Burden Tracker / Business Formation Index: Companies House + ONS.
- digital-agency — Agency Finance Benchmark: margins / EBITDA multiples / R&D claim rates by agency type (source mix TBD, likely Companies House filings + sector surveys).

---

## G. Risks and guardrails

1. **Measurement-before-optimisation is the meta-rule.** Ship GEO/Bing work before the channel split + Bing AI Performance ingestion and we cannot tell which moves worked.
2. **Quality bar / over-optimisation.** Mechanical FAQPage stuffing, robotic exact-match titles, or answer-boxes duplicating the H1 *degrade* citation probability for YMYL. Every change holds the A*/human-voice bar (no em-dashes, genuine answers, real worked numbers).
3. **Stale-figure self-poisoning is the most credibility-damaging active risk.** De-stale BEFORE accelerating indexation, or IndexNow-on-write propagates errors faster.
4. **Data-PR credibility.** A thin or sloppily-sourced index (under-counted provisional months, mislabelled OGL, encodingFormat mismatch like Property's CSV-declared/JSON-served) gets caught by journalists and AI verifiers and damages authority. Each asset needs the Landlord-Tax-Index provenance discipline or it does not ship.
5. **Spreading thin across 5 sites at once** dilutes the A* bar. Land shared force-multipliers first, then roll flagships sequentially to highest-traffic sites.
6. **AI-crawler policy reversal.** If we ever block training bots, a careless shared-template edit could also block retrieval bots (citation blackout). Keep training/retrieval blocks strictly separate; verify retrieval bots stay allowed after any edit.
7. **Honest AI numbers.** Referrer stripping means we may never get a clean AI lead count; frame the probabilistic view as a range, not a hard number, to avoid over-claiming to the partner.
8. **IndexNow queue fragility.** Per-site `.indexnow_queue` files are gitignored/ephemeral; a failed deploy can drop queued URLs. IndexNow-on-write needs a recovery/replay mechanism or acceleration backfires.
9. **Deploy-gating debt.** Schema/BLUF work on undeployed corpora (Solicitors 45+33, Medical, generalist rewrites) earns zero citations until shipped. Unblock the gates.

---

## H. Decisions (resolved 2026-06-16)

1. **Sequencing → PARALLELISE.** Measurement layer runs concurrently with the Phase-0 low-risk quick wins; the larger optimisation rollout (Phase 2+) begins once measurement is live.
2. **Data-PR flagships → ALL 5 this quarter** (highest-traffic first: Dentists + generalist, then Medical, Solicitors, agency). Each gated on a per-asset data-source sign-off (Section F).
3. **Monthly data-refresh → MANUAL trigger + monthly reminder.** No auto-deploy; preserves the locked "prod actions need sign-off" rule.
4. **Training bots → KEEP ALLOWED estate-wide** (retrieval/citation bots allowed regardless). Shared robots split makes opt-out a one-line toggle later.
5. **AI reporting stance → RANGE** (confirmed lower bound + probable upper bound). Default accepted; referrer stripping is unfixable at source.

---

## Appendix: key file pointers

- Crawl/AI surfaces: `Property/web/src/app/robots.ts`, `Property/web/public/llms.txt`, `Property/web/public/llms-full.txt`
- Schema: `Property/web/src/lib/schema.ts`, `optimisation_engine/apply/_schema_generator.py`, `optimisation_engine/apply/schema_only.py`, `packages/web-shared/schema/*`
- Flagship asset: `Property/web/src/app/research/landlord-tax-index/`, `optimisation_engine/ingestion/ingest_landlord_data.py`
- Bing/IndexNow: `optimisation_engine/indexing/submit_indexnow.py`, `optimisation_engine/clients/bing_query_client.py`, `docs/_engines/SERP_META_PROGRAM.md`
- Measurement: `supabase/migrations/` (web_sessions, channel views, `vw_channel_conversion_geo`, `vw_visitor_journey`), `console/` + per-site `admin/analytics/page.tsx`
- Writers/gates: `scripts/track2_rewrite_writer.wf.js`, `scripts/predeploy_gate.py`, `optimisation_engine/blog_generator/site_configs/*`
- Standard reference: `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md`
