# Expansion build handoff — depth-first new-site launch cores

> Self-contained handoff for a FRESH agent to keep building the Tier-1 expansion sites.
> Operate under all locked estate rules (gold-standard A* bar, model tiering, wave-batch-size-1,
> no em-dashes, autonomous-but-confirm-before-prod). Companion docs:
> [EXPANSION_TRACKER.md](EXPANSION_TRACKER.md) (live state), [EXPANSION_PROGRAM.md](EXPANSION_PROGRAM.md)
> (methodology), [EXPANSION_HANDOFF_PARITY.md](EXPANSION_HANDOFF_PARITY.md) (parity checklist).
> Locked decisions live in the `estate-expansion-program` memory.

## Where we are (2026-07-14)

Depth-first build under WORKING-BRAND placeholders, deploy held (owner registers domains + deploys
in batches). Three sites DONE + committed on `expansion/phase-0`:

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

All: brand-agnostic body corpus (render via `getSiteUrl()`/siteConfig), adversarial fact-review
passed, zero live-site touch. **NEXT = pharmacies (site 4).**

> **Sites still at R4 only (pharmacies, startups, ecommerce) need the FULL S2-S5 pipeline first;
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
