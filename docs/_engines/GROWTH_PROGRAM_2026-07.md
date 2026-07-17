# ESTATE GROWTH PROGRAM 2026-07 — Conversion Parity + Bing/GEO + Comprehensive Tools

> **HANDOFF DOCUMENT.** Self-contained: a fresh agent with no session context can execute from this file alone. On execution start, copy this file to `docs/_engines/GROWTH_PROGRAM_2026-07.md`, commit it, and maintain a `## Execution log` section at the bottom (date + phase + what shipped + verdicts). Update memory `estate_expansion_program`-style file when phases close.

---

## 1. Context & goal

Repo: `C:\Users\user\Documents\Accounting` — monorepo of lead-gen accountancy sites, all trading names of Ashfield Trading Ltd. Sites and web roots:

| Site key | Dir | Domain | Status |
|---|---|---|---|
| property | `Property/web` | www.propertytaxpartners.co.uk | Gold standard. ~32 clicks/day, record 17-lead week |
| dentists | `Dentists/web` | www.dentalfinancepartners.co.uk | Growing, 18 pages committed-not-deployed |
| solicitors | `Solicitors/web` | www.accountsforlawyers.co.uk | Impressions 20x/10wk, commercial pages don't rank |
| medical | `Medical/web` (verify dir name) | www.medicalaccounts.co.uk | Index-repair in progress, legacy pages unindexed |
| generalist | `generalist/web` | www.hollowaydavies.co.uk | Bing is the revenue channel (25-40 clicks/day) |
| agency | `digital-agency/web` | www.agencyfounderfinance.co.uk | **HOLD until 2026-07-22** (fix-wave watch window) |
| construction-cis | `construction-cis/web` | (Trade Tax Specialists) | Healthy young site |
| contractors-ir35 | `contractors-ir35/web` | (Contractor Tax Accountants) | Built, deploy pending |
| + 7 expansion Tier-1 sites | various | — | Launched 2026-07-16, no GSC/Bing data yet |

**Problem:** Property converts visitors to leads consistently; the other sites don't, even proportional to their traffic. Diagnosis (exploration 2026-07-17): the gap is **portable conversion machinery**, not strategy:

1. **Multi-step mini-forms** — Property only (deployed 2026-07-09, flag `NEXT_PUBLIC_MINIFORMS_MULTISTEP=1`, early result +~64% lead rate). Others show all 4 fields at once.
2. **Email/SMS nurture pipeline** — Property only. Others have zero follow-up after the first notification email.
3. **Tool-first blog architecture** — Property injects THREE capture moments per article via HTML split functions in `Property/web/src/components/blog/BlogPostRenderer.tsx` (~lines 90-190):
   - `splitContentEarly()`: cut at first `<h2>` (~20-25% scroll), inject premium calculator (value before the 25%-scroll bounce wall); fallback after 2nd `</p>`; final fallback append at end — every post gets it.
   - `splitRemainderForGate()`: second lower cut (heading ~50% of remainder), inject email-gated resource. Tool first, ask later.
   - `splitContentAtMidScroll()`: fallback for unmapped categories — inline mini form at ~60% of h2s.
   Other sites: one inline form mid-scroll only.
4. **Calculator breadth** — Property 16 tools (11 generic + 5 bespoke premium); dentists 5, solicitors 6, medical 3, generalist 7, construction-cis 8, contractors-ir35 7, agency 7 bespoke **with no lead capture at all**.

**Goal:** bring every site to full Property conversion parity, activate the approved Bing/GEO program estate-wide, and build a comprehensive interactive-tool estate per site. Owner decisions locked: nurture = **full email+SMS**; first wave = **generalist, dentists, solicitors**; wave 2 = medical, construction-cis, contractors-ir35; agency last (after 07-22). **Also: remove Reflex from lead auto-CC (Track D, immediate).**

## 2. Operating rules (locked, from memory — apply to ALL work)

- **Gold-standard A\* quality bar** — nothing thin/AI-scammy ships. Quality IS the strategy.
- **Model tiering:** Opus/Fable architects + judges; Sonnet subagents write content/build slices; Haiku grunt only (never content). No DeepSeek.
- **Fan-out:** one Sonnet subagent per topic/tool/site-slice, run in parallel (batch size 1, no lanes). Fable/Opus architects, briefs, QA-judges.
- **2-track editorial QA** after any content build: Opus factual pass + Opus editorial-quality pass vs Google helpful-content rubric.
- **No em-dashes in user-facing copy.** Blog body HTML in frontmatter is raw HTML (`<p>`,`<h2>`), not markdown.
- **Deploys are owner-gated (G1).** Build + commit local; `vercel deploy --prod` only on owner word (GitHub auto-deploy OFF; use `VERCEL_ORG_ID`/`VERCEL_PROJECT_ID` env pattern from repo root, project IDs in memory `vercel_cli_deploy_workflow`).
- **Isolate variables:** one intervention per surface per window; SERP meta-batch-2 pages (41 pages, property/dentists/solicitors) held untouched until ~2026-08-05; agency untouched until 07-22.
- **Fresh GSC/Bing pulls before any traffic conclusion** — stored Supabase snapshots presumed stale.
- **Self-driving follow-ups:** every watch window gets a `deploy_watch` row + automated email verdicts; never rely on owner memory.
- **Preview-gate + manual walk QA** for user-facing ships.
- **Partner email routing:** partner CC only on real leads — and per Track D, Reflex CC is being REMOVED entirely.

## 3. Key infrastructure (verified paths)

**Conversion components (Property, source of truth):**
- `Property/web/src/lib/leads/capture-steps.ts` — multi-step validators (pure functions)
- `Property/web/src/lib/leads/nurture-*.ts` — sequence-gen, nurture-control (Twilio SMS), reply-extract, reply-intent, nurture-health
- API: `/api/cron/lead-nurture`, `/api/cron/lead-nurture-digest`, `/api/leads/inbound/email`, `/api/leads/generate-sequence`
- `Property/web/src/components/blog/BlogPostRenderer.tsx` — split logic; `InlineMiniLeadForm.tsx`
- `Property/web/src/components/calculators/ResultGateModal.tsx` + `premium/` components
- Topic mapping pattern: `Property/web/src/lib/intent/taxonomy.ts` + `lib/resources/registry.ts`

**Shared calculator framework:**
- `packages/web-shared/tools/` — `<Calculator>` renderer, `GenericTool` types, `makeRegistryHelpers()`. New tool = one config file + registry entry (~2h); UI, analytics (`calc_view`/`calc_computed` etc.) and `CalcResultCta`→`MiniCapture` lead capture come free. Exemplar: `construction-cis/web/src/lib/calculators/`.

**GEO/Bing infra:**
- `docs/_engines/AI_SEARCH_GEO_PROGRAM.md` — approved program spec (locked 2026-06-16, FULL-AUTO 2026-06-17)
- `optimisation_engine/indexing/submit_indexnow.py` + `config.py` — centralised IndexNow, all 15 sites keyed
- `optimisation_engine/clients/bing_query_client.py` — BingQueryFetcher + BingAiPerformanceFetcher (`--ai-performance`)
- `optimisation_engine/apply/schema_only.py` + `_schema_generator.py` — schema CLI passes
- `optimisation_engine/weekly_run.py` — wired, but scheduled GitHub workflows all DISABLED since 2026-07-13
- Robots gold template: `Dentists/web/src/app/robots.ts` (40-bot, training/retrieval split); Property's is the older monolithic style

**Lead notify/CC:** `Property/web/src/app/api/leads/notify/route.ts` → `resolveLeadCc()` in `@/lib/lead-routing`, driven by env `LEADS_NOTIFY_CC` + `LEADS_NOTIFY_CC_EXCLUDE_SOURCES` (default "property").

---

## Higher-standard requirements (locked additions, 2026-07-17)

1. **Unify, don't copy.** Extract `MiniCapture` (+ multi-step flow), `CalcResultCta`, `ResultGateModal`, `MobileToolSlot`, and the blog split/injection logic into `packages/web-shared` (brand via CSS tokens, per pattern of `packages/web-shared/tools/`). Sites import shared components; NO per-site copies of this logic may be created. Property migrates to the shared versions too (it is the reference implementation — extract from it, then point it at the extraction).
2. **Pre-port gate:** investigate the Property multistep day-3 watch "343% error-rate ACTION" — root-cause and fix in the shared extraction BEFORE any port. Day-7 PASS may mask a validation fault.
3. **Nurture compliance/deliverability prerequisites per site:** (a) lead-form consent wording explicitly covers email + SMS follow-up (PECR) before any SMS sends; (b) SPF/DKIM/DMARC verified in Resend for each sending domain before sequences enable; (c) inbound-reply webhook wired and test-verified per site (hello@ is unmonitored — replies MUST reach the owner inbox).
4. **Baseline + test-data isolation first:** before flipping any flag on a site, snapshot its pre-period lead rate + form analytics, and implement estate-wide test-lead flagging (e.g. marker in payload → excluded from stats) so QA submissions stop polluting conversion data. (Also closes Property process-audit Wave 1 top item.)
5. **Mobile parity mandatory:** ports include `MobileToolSlot` behaviour (desktop = interactive tool, mobile = qualified capture slot — concluded A/B winner). Never ship desktop-only islands.
6. **Fold the 6 known presence defects into B0:** og-placeholder.svg og:image (4 sites), 307 redirect chains (incl. property www/non-www duplicate indexing), lawyers favicon/schema, meta-length fixes.
7. **Volume-side complement:** conversion parity fixes lead ratio, not rankings. Schedule core-page engine runs (`optimisation_engine/corepage/`) for solicitors (homepage pos ~51, "accountant for lawyers" pos 18.7) and dentists (homepage pos ~50, head family ~3,600 impr) alongside Track A — coordinate with any concurrently running SEO agent to avoid double-touching.

## TRACK D — Remove Reflex from lead auto-CC (IMMEDIATE, first action)

1. Clear `LEADS_NOTIFY_CC` on the Property Vercel project production env (empty → no CC header on any site's lead notifications; no code change).
2. Verify: submit test lead, confirm notification arrives with no CC; check notify route debug output (`ccSet: false`).
3. Note in execution log + flag: data-sharing agreement with Reflex is live — surface to owner that contract-side implications are theirs to manage. All nurture work below keeps partner routing OFF.

## TRACK B0 — GEO Phase-0 safety fixes (immediate, 1-2 days, manager-direct)

Error correction before accelerating anything AI-facing:

1. **generalist `web/public/llms.txt` domain bug** — references `ukbusinessaccountants.co.uk` instead of `hollowaydavies.co.uk`. Poisons AI attribution sitewide. Fix + fact-check all rates in it.
2. Solicitors `web/public/llms.txt`: dividend rates 8.75% → 2026/27 rates (10.75%/35.75%/39.35%, FA 2026 s.4). Solicitors `buildService` schema says "UK dentists" — fix audience.
3. Agency llms.txt: remove/fix broken `/llms-full.txt` and `/feed.xml` references.
4. Robots upgrade: dentists template (40-bot) → medical, solicitors, generalist, agency (agency file-only, deploy after 07-22). Add `/api/` disallow.
5. Embed/calculator backlink check: dentists, medical, solicitors, agency embeds must carry "Powered by [brand]" backlink + CTA.
6. DeepSeek purge from all `optimisation_engine/blog_generator/site_configs` (locked rule regardless).
7. Property `llms-full.txt` domain/figure sync per program doc.
8. While in these files: stale tax figures on live sites (separate but adjacent, manager-direct): generalist NIC 13.8%/£9,100 across 22 files; dentists profit-extraction £9,100 ×4; solicitors AMAP 45p ~5 files; generalist BADR 14%.

## TRACK B1 — Measurement wiring (~1 day, feeds everything downstream)

1. First-ever Bing pulls for dormant sites: `python -m optimisation_engine.clients.bing_query_client <site>` then `--ai-performance`, for dentists, medical, solicitors, generalist, agency, contractors-ir35 (+ expansion sites once BWT-verified). ~30 min per site. Verify rows land in `bing_query_data` / `bing_ai_performance`.
2. Fresh GSC pulls for the three wave-1 sites (per fresh-data rule).
3. Re-enable the Weekly Optimisation Engine GitHub workflow — single move that restores weekly GSC/Bing ingestion AND monitored_pages regression detection (dead since 07-13, 923 pages unwatched).
4. Fix stale `enabled: False` flags for medical/solicitors in `gsc_config.py`.
5. Insert `deploy_watch` rows for the medical (07-20) and agency (07-22) watch verdicts so gates email automatically.

## TRACK A — Conversion-stack parity

**Wave 1: generalist, dentists, solicitors. Wave 2: medical, construction-cis, contractors-ir35. Wave 3: agency (post 07-22) + expansion sites.**

Execution architecture: Fable architects the port once (shared diff plan per layer), then **one subagent per site per layer**, parallel. Each site's port is verified by build + manual preview walk before commit.

### A1. Multi-step mini-forms (highest confidence, first)
- Port `capture-steps.ts` + two-step MiniCapture flow into each site's `MiniCapture` (site-local copies near-identical; diff Property's MiniCapture vs target site's first).
- Same flag per site: `NEXT_PUBLIC_MINIFORMS_MULTISTEP`. Flip = env change at deploy time.
- Per-site watch: `deploy_watch` day-3/7/14/28 email verdicts (mini-form submit rate, error rate), mirroring Property's `miniform_multistep` key.
- Segment-specific optional fields per vertical (locked rule `feedback_business_audience_and_lead_specificity`): e.g. dentists = role (associate/principal/practice owner), solicitors = firm type (LLP/sole/partner), generalist = business type.

### A2. Tool-first blog architecture (3 capture moments)
- Port the three split functions + island rendering from Property's `BlogPostRenderer.tsx` into each site's blog renderer.
- Build per-site **topic→tool→resource registry** (Property pattern: `lib/intent/taxonomy.ts` + `lib/resources/registry.ts`): map every blog category to its best calculator + one email-gated resource. Depends on Track C rosters — sequence A2 per site AFTER that site's C1 tool build so mapping is comprehensive, with `splitContentAtMidScroll` fallback covering any unmapped category from day one.
- Port `ResultGateModal` where missing; port premium chart/grid components where a site gains premium tools.
- Email-gated resources per site: 1-2 downloadables per major category (checklists, worked-example spreadsheets), Sonnet-built, Opus-QA'd, A* quality bar.

### A3. Nurture pipeline — FULL email + SMS parity
- Port all `nurture-*.ts` modules + 4 API routes + cron wiring per site. Resend already live everywhere (lead notifications).
- SMS: shared Twilio account; **start with the existing shared UK number (+44 7723 568557) with per-brand sender copy**; move to per-site numbers only if reply-routing conflicts appear. (Owner chose full SMS parity.)
- **Safety: Property nurture was reconciled back to dry-run after a retro-blast incident.** Port the current hardened state. EVERY new site launches in dry-run; review ≥1 week of would-send logs; owner word to flip live per site. Autopause/health checks ported as-is.
- Per-vertical sequence copy: Opus-briefed, Sonnet-drafted, no em-dashes, no credential claims, faceless. Subscriber/nurture mail routes to owner inbox only (never partner — moot post-Track-D, but keep the rule).
- End-to-end test per site before dry-run even: form → Supabase → notify → sequence generation → digest render.

### A4. Agency retrofit (post 07-22)
- Refactor agency's 7 bespoke calculators (`digital-agency/web/src/components/calculators/`) to `GenericTool` configs on the shared renderer; wires in `CalcResultCta`/`MiniCapture` (currently ZERO lead capture on calc results).
- Then A1-A3 for agency.

## TRACK C — Comprehensive per-site tool estate

**Standard: every site reaches a comprehensive tool roster covering its vertical's core financial decisions — target 10-16 tools per site (Property parity), each data-justified or vertical-essential.**

### C1. Roster design then build (per site)
1. **Roster design (Fable/Opus, per site):** inputs = that site's fresh GSC + first Bing pull (Track B1), competitor tool inventories (Serper sweeps), vertical domain map. Output = per-site roster doc in `docs/<site>/TOOL_ROSTER.md`: every tool with slug, purpose, target queries, fields, compute spec, worked example, premium yes/no. Candidate seeds (validate against data, don't assume):
   - **Solicitors (6→~12):** partner tax reserve, PII premium vs turnover benchmark, LLP vs Ltd comparison, salaried-member risk scorer, client-account interest, practice sale CGT/BADR, locum/consultant solicitor take-home.
   - **Dentists (5→~12):** NHS pension AA taper, associate vs partner comparison, practice purchase affordability/goodwill loan, incorporation for associates, UDA rate benchmark, equipment capital-allowance (40% FYA FA 2026), sole trader vs Ltd extraction.
   - **Generalist (7→~14):** CGT reporting 2026, MTD ITSA readiness checker, company car vs allowance, P11D/BIK (Bing cluster play), CIS-lite, IHT/BPR estimate, dividend vs bonus 2026/27, student-loan+tax combined.
   - **Medical (3→~10):** NHS pension AA/LTA suite (the vertical's #1 pain), GP partner drawings planner, locum sessional-rate take-home, private-practice incorporation.
   - **Construction-cis (8→~12):** roofer/trade-specific variants tied to "accountant for [trade]" gap (e.g. 214 impr "accountant for roofers"), VAT domestic reverse charge checker, CIS gross-payment-status modeller.
   - **Contractors-ir35 (7→~10):** rate negotiation inside vs outside, umbrella fee comparison, MSC risk checker.
   - **Property:** LBTT non-residential calculator (270+ impr, pos 7.5-8.7, no page — from 2026-07-17 audit).
2. **Build fan-out:** one Sonnet subagent per tool (batch size 1, parallel): `GenericTool` config + registry entry + tool page copy (intro, methodology, FAQ, worked examples). All rates from ground-truth memory files (FA 2026: WDA 14%, FYA 40%, dividend 10.75/35.75/39.35, BADR 18%, employer NIC 15%/£5,000, AMAP 55p).
3. **QA:** Opus factual pass — every compute spot-checked against HMRC worked examples; editorial pass; preview walk of every tool.

### C2. Citability layer (GEO Phase 5)
- SSR static worked-example blocks on every tool page (concrete figures answer engines can cite: "On £60,000 gross, X"). Scenario pages for top tools where query data supports (`/calculators/<slug>/example-<scenario>`).
- Tools added to each site's llms.txt cornerstone section; Dataset/WebApplication JSON-LD (extend `VALID_SCHEMA_TYPES` in `schema_only.py` first); IndexNow every new/changed tool URL.

## TRACK B2 — GEO force-multipliers (rolling, after B0/B1)

1. IndexNow-on-write hooks: `enqueue()` calls in `output_writer.py` + `meta_apply.py`; drain with `--from-queue` post-deploy.
2. E-E-A-T `@graph` + BLUF `directAnswer` frontmatter rollout via `_schema_generator.py` CLI passes, per site (respect held pages).
3. Bing-first content targeting: mine agency's 127 Bing page-1 queries + each site's first Bing pull for FAQ/content targets → feeds existing gap-discovery engine (cross-site query piggyback rule).
4. Data-PR flagships (approved, one per site, each gated on owner data-source sign-off): Dentists Dental Pay & Tax Index, Medical NHS Pension AA Burden Report, Solicitors SRA Enforcement Index, generalist SME Tax Burden Tracker, agency Finance Benchmark. Property's Landlord Tax Index (`/research/landlord-tax-index`) is the live template. Build factory template first (ingest → Supabase → /research page + Dataset JSON-LD + CSV + chart embed).

---

## Sequencing (dependency order)

| # | Step | Gate |
|---|---|---|
| 0 | Track D: clear `LEADS_NOTIFY_CC` + test lead | none |
| 1 | B0 Phase-0 fixes + stale-figure sweeps (commit; deploy on owner word) | none |
| 2 | B1 measurement: first Bing pulls ×6, fresh GSC ×3, re-enable weekly workflow, deploy_watch rows | none |
| 2.5 | Shared extraction to `packages/web-shared` + multistep error-rate root-cause + baselines/test-lead flagging | Property builds green, behaviour identical |
| 3 | A1 multi-step rollout → generalist, dentists, solicitors (shared components, parallel subagents) | build+preview QA |
| 4 | C1 roster design ×3 wave-1 sites (needs B1 data) then tool build fan-out | Opus QA per tool |
| 5 | A2 blog architecture ×3 (after each site's C1 tools exist) | preview walk |
| 6 | A3 nurture port ×3, dry-run | ≥1wk would-send review + owner flip |
| 7 | C2 citability + B2 IndexNow hooks/schema passes (rolling) | held-page exclusions |
| 8 | Wave 2 (medical, construction-cis, contractors-ir35): repeat 3-7 | after wave-1 lift confirmed |
| 9 | Agency: A4 retrofit + full stack; data-PR flagships | 07-22 window close; per-asset owner sign-off |

All deploys owner-G1. Each step commits locally when green; execution log updated per step.

## Verification

- Per-site `npm run build` green + predeploy gate before any deploy request.
- A1: deploy_watch day-3/7/14/28 email verdicts per site; compare lead rate pre/post (time-segmented, per locked rule).
- A2: preview walk — tool island renders early, gate lower, fallback on unmapped category; no layout breaks on 5 sampled posts per site incl. a no-h2 post.
- A3: E2E test lead through full chain; dry-run log review; autopause verified firing on synthetic error.
- C1: every tool's compute checked against an independent HMRC worked example; `calc_*` analytics events observed in preview.
- B1: `bing_query_data`/`bing_ai_performance` row counts > 0 per site; weekly workflow run completes green.
- D: test lead email has no CC.

## Handoff notes for a fresh agent

- Read memory index first; locked rules in §2 are non-negotiable.
- Check `## Execution log` below for current position; check `git log` and `deploy_watch` table for what actually shipped.
- Watch-window landmines: agency before 07-22; meta-batch-2 pages before ~08-05; medical Request Indexing owner confirm by 07-20.
- Deploy backlog (39 pages: dentists 18, solicitors 9, generalist 12) is SEPARATE from this program — owner deploys when ready; don't block on it, but dentists £9,100 fix (B0.8) must precede the dentists deploy.
- Another agent may be running SEO optimisations concurrently — check before touching `optimisation_engine/` apply paths.

## Execution log

(empty — program not started)
