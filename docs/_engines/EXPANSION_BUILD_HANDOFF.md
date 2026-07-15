# Expansion build handoff — depth-first new-site launch cores

> Self-contained handoff for a FRESH agent to keep building the Tier-1 expansion sites.
> Operate under all locked estate rules (gold-standard A* bar, model tiering, wave-batch-size-1,
> no em-dashes, autonomous-but-confirm-before-prod). Companion docs:
> [EXPANSION_TRACKER.md](EXPANSION_TRACKER.md) (live state), [EXPANSION_PROGRAM.md](EXPANSION_PROGRAM.md)
> (methodology), [EXPANSION_HANDOFF_PARITY.md](EXPANSION_HANDOFF_PARITY.md) (parity checklist).
> Locked decisions live in the `estate-expansion-program` memory.

## Where we are (2026-07-15 PM, hardening session close — EVERYTHING DONE EXCEPT BRAND + DOMAIN)

**The full-audit hardening plan (`~/.claude/plans/i-think-make-a-gentle-stream.md`) was EXECUTED
IN FULL** this session (commits 9f08836c..fa031756 on `expansion/phase-0`, one commit per site +
one shared). All 7 Tier-1 sites are now G1-gated ONLY:

- **Lead capture end-to-end**: `/api/leads/submit` on all 7 (shared factory + niche-loader source
  key); `.env.local.example` all 7; **tranche-2 + tranche-3 Supabase migrations APPLIED to prod**
  (the generator-emitted t2 pair had dropped sibling keys a THIRD time — hand-fixed to the 15-site
  union first; live constraints re-read and verified: 15 site keys in both checks + `test`; rows
  `active=false`); blog_topics seeded crypto 1,418 / pharmacies 1,227 / ecommerce 2,329; all 7
  source keys smoke-tested (insert+ROLLBACK).
- **Legal/crawl parity (Property-grade)**: privacy-policy / cookie-policy / terms on all 7 (only
  processors actually used are listed per site); robots.ts 40-bot AI allowlist; static
  `public/llms.txt` with ledger-sourced 2026/27 figures; not-found/error pages; footer legal links
  (hospitality, crypto, charities, pharmacies had NO footer component — created); sitemap entries;
  embed backlinks verified present.
- **AI/GEO parity-or-greater**: HowTo schema via `howToSteps` frontmatter on procedural posts;
  WebApplication schema on every calculator; **Dataset schema on all research indexes (exceeds
  Property)**; Article `dateModified`; Organization enrichment (legalName Ashfield Trading Ltd,
  `knowsAbout`, `sameAs` = Companies House 16358723 only); BLUF/FAQ audits patched; llms figures
  verified current.
- **Wave-2 content: 49 assets** (Opus briefs in `briefs/<site>/wave2/` + Sonnet workers + 2-track
  Opus QA, all findings fixed manager-direct): care 6 blogs + **CQC fee calculator** (official
  scheme pinned 2026-07-15 — NOTE: cqc.org.uk WAF-403s plain fetchers, use a browser-UA curl);
  ecommerce 4 blogs + **side-hustle tax checker** (24/24 golden tests); startups-tech 9 (EMI pillar
  family); charities 2 guides + 7 blogs; crypto 7; hospitality 5 + a REAL restaurant-count section
  on the openings/closures index (CH SIC 56101/56102/56103, 191,895 active,
  `scripts/_hospitality_restaurant_count_pull.py`); pharmacies 7.
- **QA lessons banked**: workers STILL leak HP-code artefacts (incl. as visible anchor text) and
  wrong `/blog/<category>/<slug>` category segments — the category segment must match the TARGET
  post's frontmatter category, and calculator hrefs must match registry slugs (`-calculator`
  suffixes). One genuine factual error caught (locum Class 2 NIC stated as still payable), one
  wrong date (cETN Oct 2024 vs 8 Oct 2025), one YAML corruption (howToSteps inserted mid-faqs
  list in machine-games-duty, silently dropping 2 FAQs).
- **Full admin analytics suite** (leads/trends/login/visitor) ported from charities to all 6
  siblings; dashboards' previously dead links now resolve.
- **predeploy_gate change**: sanctioned-fence term allowlist added (ecommerce → hollowaydavies
  terms, per the DEDUP_AUDIT FENCE ruling); startups-tech homepage was naming its sibling brand
  ("Contractor Tax Accountants") in scope copy — rewritten out. Gate now PASSES all 7.
- **Final gates all green**: build + vitest GREEN ×7, `rates_ledger_lint` CLEAN ×7,
  `dated_reference_sweep` hits all acceptable-class, em-dash/HP/meta/brand scans clean.

**Open items for the NEXT session:**
1. **Mark wave-2 head keywords `used=true` in blog_topics BEFORE the next blog-generator run**
   (this session's broad prod UPDATE was permission-denied and ILIKE matching was too fuzzy —
   do it per-row with explicit ids; the 4-layer dedup protection covers the interim).
2. **G1 deploy support per site** (unchanged, see next section): brand+domain swap, Vercel
   spin-up, GSC/Bing, apply-time re-checks, **add each site to the Property /api/leads/notify
   allowlist at its tranche deploy** (sole sanctioned live-site touch).
3. Care deploy additionally held ~2026-08-03; ecommerce migrate-vs-fence at ITS G1 with fresh GSC.

## Where we were (2026-07-15, ecommerce session close — BUILD PROGRAM COMPLETE)

**ALL SEVEN buildable Tier-1 sites are BUILT** (charities, hospitality, crypto, pharmacies,
startups-tech, care, ecommerce); manufacturing stays PARKED. Ecommerce (site 7, LAST) closed
2026-07-15: brand-lock + full niche.config schema fix (scaffold config was missing footer_links
etc. and failed the shared validator), care-parity infra with a NEW /vat/[slug] depth-cluster
route, 26 Opus briefs, 26-asset core, 3 golden-tested calculators, Online Seller Index page
(structure only, DATA RUN PENDING: CH SIC 47910 + Advanced Search births/deaths + ONS J4MC/DRSI),
2-track QA passed. Notable session lessons: (a) adversarial QA caught the ST-vs-Ltd calculator
using a CT cliff (no marginal relief) + £12,570 salary (ignoring employer NIC) AND the blog's
worked example claiming incorporation saves £6,100 at £70k full extraction when FA 2026 dividend
rates make it ~£1,600 WORSE — under 2026/27 rates the full-extraction crossover has flipped,
retention is where the company wins; (b) the IOSS €150 / OSS £8,818 HP flags were CLEARED at
source mid-session (EU Commission OSS page + gov.uk NI distance-sales page, citations pinned in
house_positions) after editorial QA found workers narrating the omission into reader prose;
(c) infra builder again over-reached into stub content (€150 figures) exactly per the banked
lesson — content workers purged it. The Online Seller Index DATA RUN is DONE (commit 73d25cc4:
CH SIC 47910 214,751 active / 319,823 dissolved + 22 quarters churn via Advanced Search API,
ONS J4MC 27.4% 2025; re-runnable `scripts/_ecommerce_index_pull.py`; zero fabricated figures;
cohort survival curves deferred, they need the CH bulk snapshot, not the aggregate API).
Session commits: 61be441d (launch core) + 73d25cc4 (index data) + 097071d5 (STATE close-out).

## What the NEXT session does (build phase is OVER)

Nothing is buildable without owner input. The per-site playbook below stays as reference for
future niches (Tier-2) but the 7 Tier-1 builds are DONE. The next agent's work is gated:

1. **G1 deploy support (per site, owner-initiated):** owner picks FINAL brand + registers the
   domain (RDAP re-verify first) → 3-file config swap (niche.config.json, sites/<n>.json,
   STATE.md) → `VERCEL_TOKEN` in .env → `scripts/vercel_create_site.py` spin-up + preview an01 +
   live battery → GSC property + sitemap submit + Request Indexing (the number 1 new-site risk)
   + Bing import + IndexNow → apply the tranche migration (re-read the LIVE constraint first;
   generator-emitted pairs have TWICE dropped sibling site keys) → add the site to the Property
   `/api/leads/notify` allowlist (the sole sanctioned live-site touch, per-tranche Property
   deploy). Run the pre-attach rates-ledger lint + dated-reference sweep same day DNS attaches.
2. **Ecommerce G1 extra:** owner rules migrate-vs-fence on the 5 fenced HIRE hubs vs
   generalist's 6 live ecommerce pages, WITH FRESH GSC (data-gated-consolidation rule; never
   301 without it). Until ruled, both sites keep their differentiated pages.
3. **Care extra gate:** deploy additionally held to ~2026-08-03 (medical indexing watch).
4. **Deliberately NOT committed** (pre-existing, not ecommerce's): docs/_engines/
   CONTENT_GAP_ENRICHMENT.md edits, scripts/_seed_expansion_topics.py edits,
   optimisation_engine/blog_generator/site_configs/startups_tech.py, assorted scripts/_*.py
   scratch files, expansion_research/tier1_{dentists,solicitors}/ pulls, legal/*.bak. Leave
   unless their own programs claim them.
5. **Optional backlog:** blog_topics seeding for the 6 new sites (G2), Serper top-up, ecommerce
   cohort-survival upgrade via CH bulk snapshot, Tier-2 research track (farmers/expats/retail/
   FCA/travel).

## Interim hardening pass (2026-07-15, post-build session)

- **Pre-attach tools now EXIST** (they were referenced but unbuilt): `scripts/rates_ledger_lint.py`
  and `scripts/dated_reference_sweep.py` (both take `--site`, default all 7). Lint runs CLEAN on
  all 7 as of 2026-07-15 (charities' missing `docs/charities/rates_ledger.json` was built from its
  house_positions, all figures verified 2026-07-11; `applies_from: "historic"` is an accepted
  convention). Sweep is report-only: its 2026-07-15 hits were ALL correct-current-figure lines with
  explicit historical comparisons ("increased from 13.8%", "up from 45p") — acceptable class.
  Deploy-day G1 re-run is now a delta check, not a first run.
- **slugifyCategory comma-strip CLOSED estate-wide**: care's `/[(),]/g` pattern applied to the 5
  remaining copies (charities, hospitality, crypto, pharmacies, startups-tech). No live category
  contains a comma, so zero URLs changed; fix is defensive.
- Full re-verify 2026-07-15: all 7 sites `npm run build` + `vitest` GREEN; BRAND_TBD/.invalid/
  em-dash scans clean on user-facing surfaces; internal-link audit 0 suspect links.
- **blog_topics seeding state**: charities 1,660 / hospitality 1,257 / care 652 rows seeded;
  startups-tech pool finalised + seeded this session (retro-fit `s5b_finalise.py`); **crypto,
  pharmacies, ecommerce CANNOT seed until their tranche-2/3 migrations apply at G1** (no `sites`
  row yet, FK blocks). Seed them at G1 with
  `python scripts/_seed_expansion_topics.py <site> expansion_research/tier1_<site>/topic_pool_final.json dataforseo`.
- **Tier-2 research track CLOSED 2026-07-15** (commit 96618bda): farmers/expats/retail/FCA/travel
  all NO-GO after R3 evidence + paid head pulls ($0.52; DataForSEO balance was topped up to
  ~$44, the "-$0.03" above is stale). Zero new sites. Actionable survivors (owner word before
  build): generalist retail cluster, property NRL/expat waves, TOMS blog cluster. Summary
  `expansion_research/TIER2_VERDICTS.md`. Next niches need a fresh R1 enumeration, the
  89-candidate list is exhausted.
- **Ecommerce cohort-survival DONE 2026-07-15** (commit 858a17f0): CH Advanced Search supports
  status+incorporation-date+dissolved_to combined, so the bulk-snapshot backlog item is
  unnecessary; true 2018-2024 cohort curves are live on the Online Seller Index.

## Where we were (2026-07-15, care session close)

**Six sites DONE + committed on `expansion/phase-0`** (charities, hospitality, crypto, pharmacies,
startups-tech, care). Care = commit `847d97dd`, working brand **Care Finance Partners**
(www.carefinancepartners.co.uk, prefix carf, tranche 1): 22 briefs, home + 5 /for hubs + 6 services
+ 10 blogs + 4 calculators + Care Provider Business Index; build green, vitest 18/18; 2-track Opus
QA passed. DEPLOY twice-gated: G1 + medical-watch ~2026-08-03. Care gotchas banked: (a)
`slugifyCategory` did not strip commas ("Fees, FNC..." URLs would 404) — care's copy patched, CHECK
ECOMMERCE'S COPY; (b) Sonnet leaked em-dashes/HP-codes/fabricated testimonials + a fabricated
search-volume stat tile + gov.uk URL typos — Opus-for-briefs/infra/QA + Sonnet-only-for-content
tiering worked, keep it.

**ECOMMERCE (site 7, LAST) IN PROGRESS — next session resumes here:**
- S2 scaffold DONE 2026-07-15: `spinup_site --niche ecommerce --skip-db`, working brand **Ecommerce
  Tax Partners** (www.ecommercetaxpartners.co.uk, prefix ectp, tranche 3); npm build smoke green.
  UNCOMMITTED.
- **Tranche-3 migration pair HAND-EDITED**: the generator emitted constraints missing ALL tranche-1/2
  site keys (would strip hospitality/crypto/pharmacies/startups-tech/care if applied). Fixed to the
  15-site union; re-read the LIVE def before applying regardless. Do NOT re-run spinup (it would
  overwrite the fix).
- **Both R4-prelude Opus agents COMPLETED 2026-07-15 (spot-check per doctrine anyway):**
  (1) `docs/ecommerce/house_positions.md` (27 positions, 24 source-verified 2026-07-15, 3 flagged
  inline: IOSS €150 needs an EU-side citation [the outline's gov.uk cite actually carries £135],
  OSS NI £8,818/€10,000 unpinned, badges-of-trade cite HMRC BIM at build) +
  `docs/ecommerce/rates_ledger.json` (31 entries, care schema). (2)
  `expansion_research/tier1_ecommerce/DEDUP_AUDIT.md`: 18 assets → 7 UNIQUE / 6 DIFFERENTIATE /
  5 FENCE / 0 DROP. The only collision surface = the 5 HIRE hubs vs 6 live generalist blog posts
  (accountant-for-ecommerce-business/-sellers, amazon-fba, shopify, etsy, dropshippers); FENCE
  wedges now, owner migrate-vs-fence at deploy gate. The VAT/cross-border depth cluster +
  Online Seller Index are net-new to the estate. Briefs must carry the audit's wedge per
  DIFFERENTIATE/FENCE asset, and link OUT to generalist for generic topics (£90k registration
  mechanics, MTD ITSA mechanics, generic incorporation) rather than re-explaining.
- Then the standard playbook below: brand-lock 3 files (display_name/legal_name=Ashfield Trading
  Ltd/domain/email in ecommerce/niche.config.json, sites/ecommerce.json, docs/ecommerce/STATE.md
  brand_locked:true) → de-hardcode og/route.tsx + page.tsx BRAND_TBD leaks → ~14-page core briefs
  (narrower-deeper per LAUNCH_CORE; every DIFFERENTIATE asset carries its DEDUP_AUDIT wedge) →
  infra mirror care/web (freshest sibling; hub-centric) → content workers → QA → commit.
- Also uncommitted from the care session: docs/CONTENT_GAP_ENRICHMENT.md + _seed_expansion_topics.py
  edits (pre-existing), and ecommerce/ + sites/ecommerce.json + the tranche-3 migrations.

Depth-first build under WORKING-BRAND placeholders, deploy held (owner registers domains + deploys
in batches). Earlier sites:

- **Site 1 — Charities** (commit `2a501b52`): working brand **Trustee Finance Partners**
  (www.trusteefinancepartners.co.uk). 29 assets: home + 5 services + 2 sector + 6 pillar guides +
  12 blogs + 3 calculators. Build green (49 pages, 33 tests).
- **Site 2 — Hospitality** (commit `39202375`): working brand **Hospitality Finance Partners**
  (www.hospitalityfinancepartners.co.uk). 24 pages: home + 6 /for sub-trade hubs + 5 services +
  12 blogs + 3 tools + Openings/Closures Index. Build green (54 pages, 30 tests).
- **Site 3 — Crypto** (commit `a516e497`): working brand **Digital Asset Tax Partners**
  (www.digitalassettaxpartners.co.uk, prefix datp, tranche 2). 24 assets: home + 6 /for hubs +
  5 services + 12 blogs + 4 calculators + Crypto Tax Compliance Index. Build green (35 pages,
  12 tests). Crypto was only at R4, so this build ALSO ran the S2 scaffold + house_positions +
  rates_ledger first (see the note under step 0 below).
- **Site 4 — Pharmacies** (commit THIS): working brand **Pharmacy Finance Partners**
  (www.pharmacyfinancepartners.co.uk, prefix phfp, tranche 2). 27 assets: home + 5 /for hubs +
  8 services + 13 blogs + 3 calculators (purchase affordability, FP34 cash-flow, locum take-home) +
  UK Community Pharmacy Openings & Closures Index (REAL NHSBSA + Companies House SIC 47730 data,
  zero fabricated figures). Build green (53 pages, vitest 21/21). Pharmacies was R4-only, so this
  build ALSO ran the S2 scaffold + house_positions (28) + rates_ledger (26) first. Locum audience =
  content-only (no lead form). Medical-adjacency wall honoured. **Same-tranche-2 spinup re-run
  overwrote the migration pair to drop crypto** (banked lesson) — restored + hand-edited so both
  crypto AND pharmacies sit in the tranche-2 migrations.

All: brand-agnostic body corpus (render via `getSiteUrl()`/siteConfig), adversarial fact-review
passed, zero live-site touch. **NEXT = startups-tech (site 5)** — R4 done, working brand Founder
Finance Partners (prefix ffp, tranche 1); Reflex SaaS-partner conflict ruled IRRELEVANT by owner
(build it); ONLY remaining gate = run a dedup audit (0 exact + acceptable fuzzy) BEFORE writing
briefs (47% estate-dedup risk). Startups is R4-done / next-S2, so it STILL needs the R4-only
scaffold prelude (spinup_site prefix ffp, then promote HOUSE_POSITIONS_OUTLINE + rates_ledger)
BEFORE the standard build; but its Supabase sites row + leads source are ALREADY live via the t1
migration, so pass `--skip-db` and do NOT emit a new tranche migration (verify the row exists first).
Then care (BUILD ok but DEPLOY-hold to ~2026-08-03), then ecommerce LAST.

> **Sites still at R4 only (startups, ecommerce) need the FULL S2-S5 pipeline first;
> care already has S2-S5.** For an R4-only site, before the playbook below run
> `python -m optimisation_engine.ops.spinup_site --niche <n> --display-name "<working brand>"
> --domain www.<recbrand>.co.uk --brand-primary <hex> --brand-on-primary "#ffffff"
> --niche-summary "<=155ch" --tranche <N> --storage-prefix <r4 prefix> --skip-db`, then promote
> `expansion_research/tier1_<n>/HOUSE_POSITIONS_OUTLINE.md` to `docs/<n>/house_positions.md`
> (re-verify load-bearing figures at source) + write `docs/<n>/rates_ledger.json`. Do NOT use
> `scripts/scaffold_new_site.py` (older Dentists-copy tool, wrong base). Then infra-mirror the
> freshest sibling (now `crypto/web` or `hospitality/web`).

## The proven per-site playbook (run this for each remaining site)

0. **Session-start**: read this file + EXPANSION_TRACKER.md; take the topmost unbuilt site in the
   build order. Read its `expansion_research/tier1_<niche>/{LAUNCH_CORE,TOPICS,COMPETITORS,DOSSIER,
   BRAND_SHORTLIST}.md`, `docs/<niche>/house_positions.md`, and its scaffold (`<niche>/web/src/app`).
1. **Lock the working brand** (3 files): `<niche>/niche.config.json` (`display_name`, `domain` =
   `www.<recbrand>.co.uk`, `contact.email`, and FIX `legal_name` to `Ashfield Trading Ltd` if the
   scaffold left a placeholder), `sites/<niche>.json` (`displayName`, `productionDomain`), and
   `docs/<niche>/STATE.md` (`brand_locked: true` + a "working brand, not final, deploy held" note).
   Confirm `python -c "from optimisation_engine.blog_generator.generate import assert_brand_locked;
   assert_brand_locked('<niche>')"` passes. Grep for `BRAND_TBD`/`.invalid` in `<niche>/web/src` and
   de-hardcode any real leaks (the `api/og/route.tsx` OG image and `page.tsx` H1 usually leak; OG
   must render `niche.display_name` + bare domain from config).
2. **Briefs** — if `briefs/<niche>/wave1/` is EMPTY (all sites except charities were), write wave-1
   briefs FIRST via ~4 Opus cluster sub-agents (home+hubs / services / blogs split), brand-agnostic,
   every figure mapped to `house_positions.md` + gov.uk URL, HP gaps flagged NOT invented. Use the
   charities briefs (`briefs/charities/wave1/`) as the format template. (This is the expensive Opus
   stage; owner has released it for the build.)
3. **Infra** — the scaffolds are THINNER than a finished site. Delegate to ONE Sonnet builder that
   mirrors the freshest sibling (`charities/web`, now `hospitality/web`): create the missing routes
   (`/for/[slug]` + data file, `/services/[slug]` + data file, `/blog/[category]/[slug]`,
   contact/about/thank-you/embed), `config/site.ts`, `lib/schema.ts`, `LeadForm`, `layout-utils`,
   `sitemap.ts`; nav wired. Data-file interface = `{slug,title,headline,metaTitle,metaDescription,
   intro,stats[3],challenges[4],howWeHelp[3],faqs[2+]}` + a `get<Thing>(slug)` helper. Builder writes
   STUB entries + iterates `npm run build` + `npx vitest run` to GREEN. (Charities also needed a
   PUBLIC `/guides/[slug]` route for its pillar tier; hub-centric sites like hospitality/crypto do
   NOT — check the LAUNCH_CORE for whether a pillar/guide tier exists before building one.)
4. **Content** — one Sonnet worker per asset, parallel (batch size 1). Write a
   `briefs/<niche>/wave1/_WORKER_RULES.md` first (copy the hospitality one; it encodes: blog =
   raw-HTML body [loader does NO markdown conversion], guides = raw-HTML too, money pages = TS data
   entries, the 6-ish valid blog categories, and the site's SHARED DANGER ZONES distilled from the
   brief-writers' HP findings). Workers that share one data file (services, hubs) must be ONE worker
   each (sequential in-file) to avoid write conflicts; blogs are one-file-each so fully parallel. Each
   worker reads _WORKER_RULES + its brief + house_positions; TS/TSX workers run `npx tsc --noEmit`.
5. **QA gate** (manager-direct): delete any scaffold placeholder blog; em-dash + markdown-leak +
   brand-leak scans; **internal-link audit** (workers invent slugs — grep every `/services/`,
   `/for/`, `/calculators/`, `/blog/` href and fix ones that don't match real routes/slugs; get the
   real calculator slugs from `src/lib/calculators/tools/*.ts`); full `npm run build` + `vitest`
   green; confirm canonical + sitemap resolve to the working domain and no `.invalid` in built HTML;
   dispatch ONE Sonnet adversarial fact-checker vs `house_positions.md` (classes: figure-contradicts-HP,
   open-flag-figure-stated, compliance/deductibility error, fabrication, em-dash, jurisdiction) and
   fix findings manager-direct.
6. **Commit** (deploy held): stage ONLY `<niche>/ sites/<niche>.json docs/<niche>/STATE.md
   docs/_engines/EXPANSION_TRACKER.md briefs/<niche>/` (verify live-site dirs are clean:
   `git status --porcelain Property Dentists ... ` returns nothing). Update STATE.md launch-state,
   the tracker row, and the `estate-expansion-program` memory. Never deploy without owner
   final-brand + domain register (G1).

### Lessons banked (do not re-learn)
- The infra sub-agent tends to OVER-REACH and write unbriefed content into the data-file stubs that
  carries factual errors (charities: GASDS £8k-as-claim, invented dividend cap %, fabricated client
  count; hospitality: RHL-as-live, stale NIC). ALWAYS run brief+HP-driven content workers to SUPERSEDE
  the stub content, then adversarial-check.
- Blog/guide bodies are RAW HTML (the loaders inject via `dangerouslySetInnerHTML`, no markdown
  render). Markdown syntax in the body renders as literal text.
- Brief-writers sometimes leave em-dashes in the briefs (internal, not shipped) — the hard no-em-dash
  rule is enforced on CONTENT + verified in QA.
- Same-tranche spinup re-runs overwrite applied migration files — `git checkout` them back.

## Research verdicts for the remaining niches (R3 DONE + volume-enriched, all checker-verified)

Build order: **crypto → pharmacies → startups → care → ecommerce (last)**. Manufacturing PARKED.
All six R4 brand shortlists were batch-produced + RDAP re-verified 2026-07-12 (owner picks FINAL brand
at deploy; use the recommended name as the working brand).

### 3. Crypto — working brand **Digital Asset Tax Partners** (datp)
Pool 114,690/mo but the heads are DIY/brand noise (koinly 6,600, blockchain explorer 6,600) — usable
money volume is far lower. 53 rivals (22 dedicated); 1,418 clusters (272 with volume). **Strategy: the
crypto-tax SOFTWARE incumbents (Koinly, Recap) own the DIY head SERPs, so the launch core ROUTES AROUND
them** — the money surface is the **HMRC disclosure / nudge-letter lane** (top measured money term
590/mo KD 0) with the **CARF-2027** reporting timer as the topical wedge. Hire-intent + disclosure +
enforcement, not DIY calculators. 0.05% estate-dupe rate.

### 4. Pharmacies — working brand **Pharmacy Finance Partners** (phfp)
18,080/mo pool dominated by one informational head (drug tariff 14,800 = citation surface, not a
lead term). 43 rivals (7 dedicated); 1,227 clusters (37 with volume). **Wedge: buying-a-pharmacy**
(140/mo confirms purchase intent) — acquisition/valuation/finance for pharmacy owners, lead-4
economics. Locum content is content-only (not a lead lane). **Medical-adjacency wall at page level**
(medicalaccounts.co.uk ranks in-niche; keep distinct from the live Medical site). ~26 pages briefed.

### 5. Startups/tech — working brand **Founder Finance Partners** (ffp)
15,810/mo; EMI 8,100 (KD 4), R&D 7,200, CPC £35-78 (high buyer money). **Reflex SaaS partner conflict
was ruled IRRELEVANT by the owner** — build it; only the technical 47% estate-dedup gate remains, so
run a dedup audit (0 exact + acceptable fuzzy) BEFORE writing briefs. Supabase sites row + leads
source already LIVE via the t1 migration.

### 6. Care — working brand **Care Finance Partners** (carf)
6,750/mo; cqc-registration 2,900 (KD 26), care-home-accountant CPC £39; **lead-5, the BEST unit
economics of the set**. 41 rivals (12 dedicated); 652 clusters (53 with volume); the dedicated tier is
nearly invisible in Google (strongest gap thesis). FNC calculator promoted to launch tier (FNC
£267.68/week is the 2026-27 England rate). **BUILD now, but DEPLOY-HOLD to ~2026-08-03** (medical
discovery indexing watch); building is fine, only the deploy waits.

### 7. Ecommerce — working brand **Ecommerce Tax Partners** (ectp), BUILD LAST
16,400/mo; side-hustle 5,910 (CPC £29-44); the hardest, most saturated field. 82 rivals (14 dedicated
+ 47 SECTION + 21 adjacent); 2,329 clusters (50 with volume). Narrower-deeper 14-page core; the
side-hustle / platform-reporting family (5,910/mo) is the top build surface; TikTok folded into the
marketplace hub. **Collides with generalist's 6 live "Accountant For [ecommerce]" pages — owner
migrate-vs-fence ruling needed at ITS launch with fresh GSC** (deferred, decided at build time).

### — Manufacturing — PARKED (owner to ratify)
Hire family only 360/mo; a dedicated brand earns essentially zero hire-intent traffic. No R4 run.
If parked stays, the CBAM cluster needs a home ruling. Do NOT build without a cheap paid pull showing
demand.

## Standing open items (deploy-gate, non-blocking for building)
- **Generalist (Holloway Davies) overlaps**: 4 live hospitality posts, 6 live ecommerce pages, ~2
  charity pages, ~37 startup/R&D URLs. Per-cluster owner cede/301-vs-differentiate call, data-gated,
  decided at each site's deploy gate — NOT a build blocker while deploy is held.
- **Owner deploy inputs** (per site, at G1): pick final brand + register domain (RDAP re-verify),
  then 3-file config swap; `VERCEL_TOKEN` in `.env`; `scripts/vercel_create_site.py` spin-up + live
  battery; GSC + IndexNow submit; add the site to the Property `/api/leads/notify` allowlist.
- Serper credits exhausted (dossiers' Google re-sweeps compensated by fetch-verification; nice-to-have).
