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
   - `splitRemainderForGate()`: second lower cut (heading ~50% of remainder), inject the qualified lead form (GateOrForm; email-gate retired 2026-06-16). Tool first, ask later.
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
- Build per-site **topic→tool→resource registry** (Property pattern: `lib/intent/taxonomy.ts` + `lib/resources/registry.ts`): map every blog category to its best calculator + one free resource. Depends on Track C rosters — sequence A2 per site AFTER that site's C1 tool build so mapping is comprehensive, with `splitContentAtMidScroll` fallback covering any unmapped category from day one.
- Port `ResultGateModal` where missing; port premium chart/grid components where a site gains premium tools.
- **CORRECTED 2026-07-18 (owner): NO email-gated resources.** Property retired the blog email-gate 2026-06-16 (f90f6cca, "the qualified capture replaces the dead CTA link and the dead email-gate") — it wasn't converting. The mid-article slot renders the QUALIFIED lead form (GateOrForm/MiniCapture "free review" pattern). Downloadables/guides (checklists, worked-example spreadsheets — Sonnet-built, Opus-QA'd, A* bar) ship as OPEN research/resource pages with direct downloads + lead CTA, never behind an email unlock.

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

### 2026-07-17 — session 1 (program start)

**DONE:**
- Plan committed as this doc (ce1632fd).
- **Track D COMPLETE in code (946f1623), NOT YET LIVE.** Root cause was NOT env: `DEFAULT_PARTNER_CC` was hardcoded to the Reflex address in `Property/web/src/lib/lead-routing.ts` as the fallback when `LEADS_NOTIFY_CC` unset (and it IS unset in Vercel — verified via API; only `LEADS_NOTIFY_CC_EXCLUDE_SOURCES` + `LEADS_NOTIFY_SECRET` exist on the project). Fix: `DEFAULT_PARTNER_CC = ""` → no external CC unless env explicitly set. Tests rewritten (13 pass), tsc clean. **⚠ Live site still CCs Reflex until Property is next deployed — include in next Property deploy and verify with a test lead (no CC).**
- Vercel API access works: `VERCEL_TOKEN` in root `.env`; Property project = `prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU` (`property-tax-partners`).

**B0 findings so far — VERIFY EVERY EXPLORER CLAIM BEFORE EDITING (2 of 3 checked were stale):**
- B0.1 generalist llms.txt domain bug: **DOES NOT EXIST** — file correct locally AND live (checked https://www.hollowaydavies.co.uk/llms.txt, rates all current 2026/27). Skip.
- B0.2a solicitors llms.txt dividends: **ALREADY FIXED** (10.75/35.75/39.35 present, correctly framed). STILL TO DO in `Solicitors/web/public/llms.txt`: header "Key facts (current figures, 2025/26)" → 2026/27; cornerstone line "UK solicitor tax rates 2025/26 reference"; BADR block presents 14% as current and 18% as future — 18% IS current since 6 Apr 2026. Reframe those three spots.
- B0.2b solicitors `buildService` "UK dentists" audience: **DOES NOT EXIST** — `Solicitors/web/src/lib/schema/service.ts` default audience is solicitors. Skip.
- B0 items 3-8 NOT yet verified/started: agency llms.txt broken refs, robots 40-bot rollout (template = `Dentists/web/src/app/robots.ts`), embed backlinks, DeepSeek purge, Property llms-full sync, 6 presence defects, B0.8 stale-figure sweeps.

**Session task list at handoff:** #1 B0 in_progress, #2 B0.8 pending, #3 B1 pending, #4 shared-extraction (step 2.5) pending.

### 2026-07-17 — session 2 (B0 near-complete)

**PROCESS CORRECTION (owner instruction, applies to all future sessions):** the executing agent is ARCHITECT/PM/full-stack lead, NOT the implementor. Fan work out to Sonnet subagents (per §2 fan-out rule) to keep main context clean. Only the B0.8-style per-citation stale sweeps stay manager-direct (locked memory rule); verification greps, presence-defect fixes, and all build slices get delegated.

**DONE (all committed on `expansion/phase-0`):**
- **8e177ff1** — B0.2 solicitors `web/public/llms.txt` reframed to 2026/27 (header, cornerstone line, BADR block now 18% current / 14% historical). B0.4 robots: medical + solicitors ALREADY had the dentists 40-bot template verbatim; generalist + agency have identical bot coverage, only functional gap was `/api/` disallow — patched minimally (agency keeps `allow: /api/uk-tax-rates.json`, it's advertised in its llms.txt).
- **d8e1b850** — B0.8 sweeps (manager-direct per locked rule):
  - generalist NIC 15%/£5,000: `how-to-pay-yourself-from-a-limited-company.md` (FAQs, optimum-salary section, Sarah/James/Priya examples all recomputed; optimum advice now £12,570 with LEL/state-pension nuance), `definitive-guide-choosing-contractor-accountant-uk.md` (salary table recomputed), `limited-company-vs-sole-trader.md` (Tom example recomputed), `guides/[slug]/data.ts` (Class 1A 15% ×2, salary advice, two-director EA note). All other generalist NIC grep hits verified correctly framed (historical context) — left alone. Tests green (71 pass).
  - dentists: `practice-profit-extraction-partnership-vs-ltd.md` salary-stacking FAQ fixed (was presenting £9,100 threshold as current). **This was the gate on the dentists deploy backlog — now clear.** Compute .ts files verified already correct.
  - solicitors AMAP 45p→55p: 4 blog files (locum worked example recomputed to £6,300). Two other 45p hits are "45p of tax per £1" phrasing, not AMAP — left.
  - generalist BADR: verified ALREADY CLEAN estate-wide (18% current everywhere incl. calculators/tests). No edits needed.
- **B0 claims verified stale/already-done, SKIP:** B0.1 (generalist llms.txt fine), B0.2b (solicitors schema audience fine), B0.3 (agency llms-full.txt/feed.xml/uk-tax-rates.json all live 200), B0.5 (shared `EmbedAttribution` renders Powered-by backlink + CTA on all sites' /embed pages), B0.6 (DeepSeek already a banned stub in blog_generator; only a comment mentions it), B0.7 (Property llms-full.txt current 2026/27, correct domain).
- **HELD pages excluded from sweep (active watch windows, revisit ~2026-08-05):** generalist `correct-paye-overpayment-hmrc` + `ir35-explained`, solicitors `accountant-for-barristers-chambers-uk`. Intersection method: `monitored_pages` (Supabase, `scripts/_q.py`) status=active rewrite_date≥2026-06-25 vs sweep hit-list.
- **New stale-figure finding (out of B0.8 scope, add to hit-list):** generalist `glossary/[slug]/data.ts` BADR entries compare against "standard 20%" CGT — higher rate is 24% since Oct 2024; savings arithmetic in those paragraphs needs redoing.

**B0 REMAINING — presence defects (item 6), partially verified this session:**
1. og:image placeholder: `og-placeholder` NOT referenced in any site's `src/` anymore — verify LIVE og:image per site before treating as open; may already be fixed or referenced via public path.
2. 307→308 apex→www on lawyers/medical/holloway/agency: Vercel domain config, NOT code — prod change, needs owner word; prepare API calls only (VERCEL_TOKEN in root .env works).
3. Solicitors favicon: CONFIRMED missing (no icon file in `Solicitors/web/src/app` or `public/`) + thin schema (no WebSite/FAQ/Service).
4. Agency Organization schema: `digital-agency/web/src/lib/organization-schema.ts` EXISTS — verify it's wired into layout/page before writing anything.
5. Homepage meta descriptions >160ch: dental 175 / lawyers 169 / medical 185 / agency 185 — unverified.
6. sameAs empty ×4: GATED on owner exposure decision, skip.

**NEXT ACTION:** delegate B0 presence defects (verify-then-fix, one subagent per site) per the process correction above; then B1 measurement wiring; then step 2.5 shared extraction. Branch: `expansion/phase-0`. All deploys owner-G1.

### 2026-07-17 — session 3 (B0 presence defects CLOSED, B1 DONE)

**B0.6 presence defects — DONE (e3e54196), 4 parallel Sonnet workers + manager consolidation:**
- Meta descriptions to 140-155ch: dentists 176→150, solicitors 165→149, medical 186→144, agency 186→147 (agency file-only, held to 07-22).
- og:image SVG placeholder killed: dentists → existing `/brand/logo.png`; solicitors + medical had ZERO raster assets → generated 1200x630 brand cards (`scripts/_gen_og_cards.py` → `/brand/og-card.png`, `publisher_logo_url` updated). Agency already PNG (skip).
- Solicitors: `app/icon.svg` favicon created; `buildWebSite()` wired on homepage alongside org schema.
- Verified fine, skipped: agency Organization schema (wired at `page.tsx:129`; `organization-schema.ts` is an unused dupe), all title lengths.
- 307→308: CONFIRMED missing on 4 apex domains (solicitors/medical/generalist/agency; property+dentists already 308). Prep script `scripts/_redirect_308_prep.py` — dry-run inspects, `--apply` PATCHes all 4. **PROD CHANGE, owner word.** sameAs still gated on exposure decision.
- B0 is now fully closed except the two owner-gated items above.

**B1 measurement — DONE (delegated):**
- First Bing pulls landed in `bing_query_data` (2026-07-17): dentists 750, medical 737, solicitors 2,438, generalist 2,910, agency 180. contractors-ir35 = 0 (no BWT data — needs BWT verification). Per-page query stats rate-limited after ~10-14 pages; re-run idempotent.
- `--ai-performance` FAILED all sites: client's `GetAiPerformance` method doesn't exist in the BWT API (client source itself flags it as assumed). KNOWN LIMITATION — needs client fix against real BWT docs, not a retry. 0 rows in `bing_ai_performance`.
- Fresh GSC: generalist 4,236 / dentists 1,126 / solicitors 893 rows upserted.
- Weekly Optimisation Engine workflow (ID 279817608) re-enabled — ONLY that one; other 5 stay disabled.
- No `gsc_config.py` exists; medical+solicitors already `active: true` in Supabase `sites`. Skip.
- deploy_watch rows NOT inserted: cron (`Property .../api/cron/deploy-watch`) is hardcoded to `watch_key='miniform_multistep'` + Property web_events; rows for medical/agency would be inert. DEFERRED: generalize cron when A1 ports need per-site watches anyway. Instead: medical needs no row (owner call 2026-07-17: no hard windows); agency 07-22 covered by one-time cloud reminder routine `trig_019Eamo9dnSB8KRJuoHUVzFH` (fires 07-22 08:00 London).

**NEXT ACTION (session 3 cont / session 4):** step 2.5 — (a) root-cause Property multistep day-3 "343% error-rate ACTION" (pre-port gate), (b) shared extraction of MiniCapture/multistep/CalcResultCta/ResultGateModal/MobileToolSlot/blog-split into `packages/web-shared`, (c) baselines + estate-wide test-lead flagging. Then step 3 A1 ports. Branch `expansion/phase-0`.

**Session 3 continued — steps 2.5 + 3 (A1) DONE:**
- **2.5c baselines (24d326b1):** `docs/_engines/CONVERSION_BASELINES_2026-07-17.md`. Leads/100 Bing clicks (60d, clean): property 1.15, dentists 0.63, generalist 0.56, **solicitors 0.19** (biggest gap; 2nd-highest traffic, 17% form completion vs Property 32%). GSC clicks near-zero for wave-1 sites — Bing is the traffic channel. No form analytics existed outside Property (clean pre-period).
- **2.5a root cause:** "343%" = 14 `form_error` / 2 `form_step_complete` (no volume floor) on day 3; 96% of all errors = `message min_length` on `calc_result_gate` (40ch/8w floor blocking users). NOT a code bug; validators/state/instrumentation correct; no test-data contamination. Error rate never dipped below the 40% ACTION threshold any single day — day-7 PASS checks different metrics.
- **2.5b shared extraction (ec38f821):** `packages/web-shared/leads/{capture-steps,MiniCapture,ResultGateModal,CalcResultCta,MobileToolSlot}` + `content/blog-splits` + form-tracking step callbacks. Property migrated to thin wrappers, local logic deleted. Fixes folded in: message floor 20ch/4w default (Property override removed); deploy-watch error-share verdict LOW_VOLUME below 10 completions. Property tsc/1116 tests/build all green.
- **Step 3 A1 ports + test-lead flagging (08b12aad):** generalist/dentists/solicitors MiniCapture → shared wrappers (all call sites unchanged); segment fields from each site's niche.config (generalist business type, dentists role, solicitors firm type); multistep flag documented per site, OFF until deploy. Test-lead flagging estate-wide: `leads.is_test` column live in Supabase, server-side detection (shared handler + Property route), client `?qa=1` marker, notify skips test leads. All 4 sites typecheck/test/build green.
- **OWNER DECISION 2026-07-17: consent = acknowledgement-by-submission (Property style), NO checkbox estate-wide.** A checkbox variant was built then explicitly rejected and reverted; memory `lead_form_consent` updated. Old site-local forms had checkboxes — this is a deliberate change shipping with the A1 ports.
- **Watch-window followups:** agency 07-22 one-time cloud reminder routine `trig_019Eamo9dnSB8KRJuoHUVzFH`; medical needs none (owner: no hard windows). deploy_watch cron generalization deferred until A1 flags flip (it needs per-site web_events, which now exist via shared form tracking on generalist; dentists/solicitors sinks noted in port reports).
- Notes: dentists + generalist consent text still names Reflex Accounting (contract-side, owner's call); generalist `sourceIdentifier` stays "generalist" (server enforces; memory note about 'general' CHECK value appears stale — verify against leads CHECK constraint before changing anything).

**NEXT ACTION (step 4, C1):** roster design ×3 wave-1 sites — mine fresh GSC+Bing pulls + competitor tool inventories per site (delegate data-mining to Sonnet), then Fable/Opus writes `docs/<site>/TOOL_ROSTER.md`, then tool build fan-out (one Sonnet per tool). After each site's tools exist → A2 blog architecture for that site. Deploys owner-G1; A1 flags flip at deploy time only.

**Session 3 continued — C1 EXECUTED (design + build + integration committed, QA in flight):**
- **Roster inputs + design (962faab5):** per-site mining (fresh GSC + first Bing) + competitor sweeps. Serper credits EXHAUSTED — owner directed switch to DataForSEO (creds in root .env, works, ~$0.04 total for 19 queries). Live-SERP verdicts reshaped the rosters: solicitors COLP/COFA + hourly-rate-benchmark pure whitespace, conveyancing calc DOMINATED (skipped); dentists SDR Scotland / incorporation / practice-sale-CGT whitespace, associate-take-home + valuation DOMINATED (differentiate, don't rebuild); generalist P11D Google-dominated but ~4k Bing impr → built as Bing play; real Google gaps = associated-companies CT, VAT threshold, CGT 60-day.
- **Build fan-out: 27 parallel Sonnet builders** (one per tool, no registry edits) then **3 integrator agents** (registry/taxonomy wiring, category unification, concurrent-test-file integrity). Committed: solicitors 99db1207 (8 new + locum mode; 15 total), dentists 3d90c566 (6 new + practice-purchase/practice-sale-cgt gallery promotions + premium associate-incorporation + FA2026 label refresh; 13 public + premium), generalist 6433ff33 (10 new; 17 total). All builds green: solicitors 158 tests/292 pages, dentists 406 tests, generalist 233 tests/714 pages.
- Notable content finding baked into copy honestly: at FA 2026 dividend rates + 15% employer NIC, full-extraction Ltd rarely beats sole trader (generalist crossover window £60.2k-£62.6k at £0 admin, none at ≥£100 admin; dentists associate ST ahead ~£19k/yr incl. pension value).
- **QA IN FLIGHT:** 3 Opus 2-track QA agents (factual recompute + live-source verification of flagged constants: GHR table, SRA rule cites, SDR Scotland fees, NHS pension tiers/benchmarks, BIK bands/multipliers/official rate, AMAP secondary rates + editorial rubric). Fix-authority granted; commit after green.
- Parked for later phases: A2 hosts the dentists premium incorporation SSR block; solicitors law-firm-sale-cgt on-page gate deviates from in-blog-only convention BY ROSTER INSTRUCTION (one-line revert available); sibling-tool em-dash sweep (40+ pre-existing in old solicitors tool files); shared Calculator lacks conditional field visibility + chart series rendering (upgrade candidates).
- **NEXT after QA: C2 citability** (tools into llms.txt cornerstones, WebApplication/Dataset JSON-LD via schema_only.py VALID_SCHEMA_TYPES extension, IndexNow on deploy) **+ A2 blog architecture ×3** (topic→tool→resource registries per site now that rosters exist, blog split functions from web-shared, email-gated resources). Then A3 nurture. Deploys owner-G1.

### 2026-07-17 — session 3 CLOSE (handoff to fresh agent; context rotated on owner instruction)

**QA + A2 both COMPLETE. Session-3 commit chain (branch `expansion/phase-0`, in order):** e3e54196 B0.6 presence fixes → d97244f4 medical STATE → c5eb863a log → 24d326b1 baselines → ec38f821 shared extraction+multistep fixes → 08b12aad A1 ports+test-lead flagging → 962faab5 rosters → 99db1207/3d90c566/6433ff33 C1 builds ×3 → 775d7459 log → 344ffe3d/8d9f3823/04879913 QA fixes ×3 → 3d42a76c/62cddb15/0113f5d7 A2 ×3.

**Opus QA verdicts (all fixes committed):** solicitors 8/9 PASS, GHR table updated to verified Jan-2026 judiciary.uk figures. Generalist 7/10 PASS; fixed 2026/27 BIK upratings (fuel multiplier £29,200, van £4,170, van fuel £798 — NOT yet in canonical uk-tax-rates.ts, candidate benefitsInKind block), associated-companies example, added sole-trader-vs-ltd golden test. Dentists: two REAL bugs fixed (40% FYA was wrongly company-only — it's all-businesses; associate-incorporation used a fabricated 6.3% admin levy — real 0.08%, employer 23.7% total, headline was ~30% overstated); SDR fees now real Amendment-167 values; owner-income benchmarks rebased to NHS Digital 2023/24 (£78,200 avg); GDC ARF £698. Every flagged constant live-source verified.

**A2 state:** all 3 sites render 3 capture moments from `packages/web-shared/content/blog-splits` (early tool island after first h2, resource gate ~50% of remainder, inline-form fallback for unmapped). Site mapping files: solicitors `src/lib/blog/capture-map.ts`; dentists existing `premium/resources.ts` TOPIC_RESOURCES (10 categories live); generalist `earlyToolForBlogSlug()` in `src/lib/intent/taxonomy.ts` + new `components/blog/ToolIsland.tsx`. All builds/tests green (solicitors 158, dentists 410, generalist 237/709 routes).

**NEXT ACTION for the fresh agent (in order):**
1. **Gated-resource content wave** — build the TODO downloadables (Sonnet builders, Opus QA, A* bar): solicitors 4 (practice-finance guide, VAT guide, incorporation guide, PII guide — see capture-map.ts TODOs), generalist 2 (bookkeeping/MTD checklist ~63 posts + corporation-tax asset ~41 posts — registry.ts TODOs), dentists 1 (associate-incorporation category + resource; SSR worked-examples component already mounts). Also fix solicitors taxonomy gap: `partnership-llp-structure` missing from `taxonomy.ts` partnership-llp.blogCategorySlugs (17 posts).
2. **C2 citability** — new tools into each site's llms.txt cornerstone section; WebApplication JSON-LD (extend VALID_SCHEMA_TYPES in `optimisation_engine/apply/schema_only.py` first); queue IndexNow for all new tool URLs at deploy.
3. **A3 nurture ports ×3** — port Property `nurture-*.ts` + 4 API routes + cron per site, EVERYTHING in dry-run, per §A3 prerequisites (consent wording covers email+SMS, SPF/DKIM/DMARC per domain in Resend, inbound-reply webhook test-verified). ≥1wk would-send review then owner flip per site.
4. **Wave 2** (medical, construction-cis, contractors-ir35): repeat C1→A1→A2 per playbook. Agency after 07-22 (cloud reminder routine trig_019Eamo9dnSB8KRJuoHUVzFH fires 07-22 08:00).
5. Housekeeping backlog: em-dash sweep of OLD solicitors tool configs (40+); shared Calculator upgrades (conditional field visibility, chart series); benefitsInKind block in generalist uk-tax-rates.ts; generalist unmapped tools (mileage, capital-allowances-vehicle, cis) need blog categories or /for pages; deploy-watch cron generalization for per-site A1 watches (needed before flags flip).

**OWNER-GATED, waiting on word (surface these):** (a) 308 redirect fix: `python scripts/_redirect_308_prep.py --apply` (4 apex domains, prod); (b) Property deploy (carries Reflex CC removal live + multistep message-floor fix + deploy-watch guard); (c) wave-1 site deploys when ready (A1 multistep flag flips at deploy via NEXT_PUBLIC_MINIFORMS_MULTISTEP=1 per site + baseline `deploy_watch` equivalent — note cron generalization item 5); (d) 39-page deploy backlog (dentists £9,100 gate CLEARED session 2); (e) sameAs/GBP exposure decision.

### 2026-07-17 — session 4 CLOSE (gated-resource content wave DONE; handoff to fresh agent)

**Step-1 gated-resource wave COMPLETE (built by 3 parallel Sonnet builders, Opus 2-track QA with fix authority, all suites re-verified green before commit):**
- **36689d61 solicitors:** 4 resources live (`practice-finance` guide+xlsx, `vat` guide, `incorporation` guide+xlsx, `professional-indemnity` guide) — registry keys on TopicKey, NOT the old `-guide` placeholder ids; capture-map TODOs removed; `partnership-llp-structure` taxonomy gap FIXED (17 posts mapped); new `professional-indemnity` TopicKey, `indemnity-premium-estimator` rerouted to it. QA fixes: Brabners cite [2017] UKFTT 0666 (TC), search-fee VAT test rewritten, counsel-fee re-addressing concession, fabricated PII excess cap removed, ARP → Extended Policy Period, Class 2 NIC abolition, dividend higher rate 33.75→35.75 in guide+builder (workbooks regenerated). 158 tests + build green.
- **47e2abe7 generalist:** single `compliance` TopicKey kept (both blog categories map there by design — a `corporation-tax` split was considered and rejected as churn against an explicit design comment). One 5-tab workbook (MTD ITSA checklist + CT planner) + combined guide covers ~104 posts. QA fix: MTD £20k/April-2028 phase. Golden tests added (CT 22,750/17,450/5,300). 242 tests + build green.
- **365147f5 dentists:** `associate-incorporation` TopicKey end-to-end (taxonomy → TOPIC_RESOURCES → registry → `/resources/associate-incorporation`); honest framing kept. QA fix: NHS employer pension rate 20.68→23.78 across tool compute/config/worked examples/goldens/guide. NOTE: no blog posts carry the category yet — wiring is ready for when they land. 410 tests + build green.
- C2 prerequisite done this session: `VALID_SCHEMA_TYPES` in `optimisation_engine/apply/schema_only.py` extended with WebApplication/SoftwareApplication/Dataset.

**NEXT ACTION for the fresh agent (in order):**
1. **C2 citability** — new tools + gated resources into each site's llms.txt cornerstone section; WebApplication JSON-LD on tool pages (VALID_SCHEMA_TYPES already extended); SSR worked-example blocks where missing; queue IndexNow for all new tool/resource URLs at deploy.
2. **A3 nurture ports ×3** — port Property `nurture-*.ts` + 4 API routes + cron per site, EVERYTHING dry-run, per §A3 prerequisites (consent wording covers email+SMS, SPF/DKIM/DMARC per domain in Resend, inbound-reply webhook test-verified). ≥1wk would-send review then owner flip per site.
3. **Wave 2** (medical, construction-cis, contractors-ir35): repeat C1→A1→A2→resources per playbook. Agency after 07-22 (cloud reminder trig_019Eamo9dnSB8KRJuoHUVzFH).
4. Housekeeping backlog (adds to session-3 item 5): **`Solicitors/web/src/app/uk-solicitor-tax-rates/page.tsx` presents 2025/26 dividend rates (8.75/33.75) as current — live rates page, stale-figure sweep needed**; em-dash sweep of old solicitors tool configs; shared Calculator upgrades; benefitsInKind block in generalist uk-tax-rates.ts; generalist unmapped tools; deploy-watch cron generalization (needed before A1 flags flip); dentists blog posts for the new associate-incorporation category.
5. Residual QA caveats (framed honestly in copy, no action unless sources found): PII benchmark % ranges + run-off 2.5-3x are market rules of thumb; LLP Class 4 NIC 6%/2% assumed unchanged 2026/27.

**OWNER-GATED, still waiting on word:** (a) 308 redirects `python scripts/_redirect_308_prep.py --apply`; (b) Property deploy (Reflex CC removal + multistep fixes go live); (c) wave-1 site deploys (A1 flag flips + now also ships all gated resources); (d) 39-page deploy backlog; (e) sameAs/GBP exposure decision.

**Facts a fresh agent needs:** verify-before-edit rule (multiple stale-claim incidents); consent = acknowledgement-by-submission on mini forms, NO checkbox (owner decision, memory `lead_form_consent`); Serper credits EXHAUSTED, use DataForSEO (root .env, cheap); test leads = `?qa=1` (leads.is_test live in Supabase); Bing `--ai-performance` client calls a nonexistent API method (known limitation); contractors-ir35 has no BWT data (needs Bing Webmaster verification before its wave-2 pulls); expected CRO impact estimate: ~3x wave-1 lead volume at full parity (solicitors ~6x headroom), caveated small samples.

### 2026-07-18 — session 5 (Opus, after Fable credits ran out mid-session)

**EMAIL-GATE CORRECTION (e921ae00) — owner-flagged.** The gated-resource waves (cro-parity R3 + growth session-4) were WRONG: Property retired its blog email-gate 2026-06-16 (f90f6cca) because it wasn't converting. Gates had shipped on generalist/dentists/solicitors AND medical (medical LIVE in prod via cro-parity a28b11c8). Fixed (4 parallel Sonnet workers): blog mid-slot now renders qualified MiniCapture "free review" form (GateOrForm pattern), NOT email-unlock; `/resources/[topic]` pages reframed as OPEN research pieces (guide fully visible, xlsx direct download, noindex removed, added to sitemaps, lead CTA at foot); RESOURCE_EMAIL_* flags dead. Builds+tests green (generalist 242/dentists 410/solicitors 158/medical 334). Plan doc §A2 corrected. NOT deployed.

**A3 nurture prereq audit + OWNER DECISION:** owner said use the EXISTING Property Resend domain (`leads@propertytaxpartners.co.uk` send, `inbound.propertytaxpartners.co.uk` reply — both already verified) shared across all sites; NO per-site Resend domain setup needed. Remaining A3 port work (from audit): consent text omits email/SMS on all sites incl Property (update before enabling channels); `lead_nurture_control` is a single estate-wide row id=1 (needs site_key or per-site row else pause = estate-wide); 5 hardcoded "property" literals in nurture-health/digest + per-site RESEND_FROM_EMAIL override; dry-run works via master arm `LEAD_NURTURE_ENABLED` off (all sends skipped, state machine advances).

**C2 citability IN PROGRESS (this session):**
- llms.txt ×3 brought to full Property parity (intro, dated Key Facts block, cornerstone guides, tools + open-resources sections, audience/"for" pages where they exist, contact). All slugs verified. NOT committed yet.
- SSR worked-example blocks added to 22 tools missing them (generalist 7, dentists 7, solicitors 8), derived from each tool's own compute fn, Opus 2-track factual QA. QA found + fixed real bugs (see below).
- Tool-page WebApplication JSON-LD: ALREADY LIVE on every calculator (buildWebApplication in [slug]/page.tsx) — no C2 action needed.
- IndexNow: manual `python -m optimisation_engine.indexing.submit_indexnow --site <s> --enqueue <url>` then `--from-queue` post-deploy; all 3 sites keyed. Stage at deploy.
- Solicitors `uk-solicitor-tax-rates` stale page FIXED manager-direct (was 2025/26 framing + 8.75/33.75 dividends → reframed 2026/27, 10.75/35.75, BADR 18% current).

**REAL BUG FOUND via worked-example QA (fix in flight):** UK income-tax compute mismeasures the higher-rate band once PA tapers — outputs £54,332 on £150k profit where correct is £53,703 (basic band is fixed £37,700; buggy code derived it as £50,270−PA). Affects at least solicitors `partnership-vs-llp-take-home` + dentists `principal-extraction`; a fixer agent is grepping BOTH sites for the same pattern, fixing compute, re-deriving worked examples, updating goldens.

**CONVERSION-PARITY COMPLETENESS AUDIT (answered owner "is the 4-pillar list everything Property does?" — NO).** Full Property CRO surface mapped (56 mechanisms) vs wave-1 sites. Personalization spine IS at parity (intent engine, sticky CTA, deep-scroll modal, returning bar, result gate, mobile-tool slot, journey model). TRUE GAPS ranked:
  1. **Booking/scheduling layer** (highest impact): thank-you-page inline BookingPicker + `/book` route + `/api/leads/book` + 3-step endowed-progress bar + booking-token on submit. Wave-1 sites dead-end at plain thank-you page. NET-NEW BUILD.
  2. **Progressive lead completion**: DetailsForm + `/complete` route + email-only capture + server phone-plausibility (`needsCheck`). NET-NEW.
  3. **Immediate SMS/email + reply-to-confirm handshake + cross-session booking re-nudge.** Ties into A3.
  4. **SpecialistWidget** (proactive assistant; subsumes exit-intent/dwell/friction/booking-concierge) — BUILT but UNMOUNTED on generalist+dentists, which instead run the ExitIntentModal Property RETIRED as a loser (162 shows→0 leads). Solicitors mounts it. → QUICK WIN (mount + retire ExitIntentModal) — IN FLIGHT this session.
  5. Dentists multistep flag not wired (generalist+solicitors have it) — quick win, in flight.
  6. Richer qualifying LeadForm (situation/prompted/callGoal free-text) + notice-only consent vs checkbox.
  7. Conversion-support islands: ServiceTiers DIY→Assisted→Full ladder, StatsBar, urgency counters.
  → Gaps 1-3 = a Track-A parity-completion sub-wave (booking + progressive-completion + nurture-handshake stack). Gaps 4-5 quick wins in flight. Gaps 6-7 deliberate Property choices, lower priority.

**COMMITTED this session:** bd562dbd (C2 + SpecialistWidget mounts + income-tax bug fix across 5 compute libs + stale rates page) → e3113527 (A3 nurture dry-run port ×3).

**A3 DONE (e3113527, dry-run Phase 1):** nurture-control/health/digest + 2 cron routes + config chain ported to all 3 wave-1 sites; enrollment wired into each submit (shared handler gained optional onLeadInserted hook, backward-compat verified Property+all sites tsc clean); nurture-control keyed on site_key; migration `supabase/migrations/20260718000001_lead_nurture_control_site_scope.sql` (additive, go-live prereq); digest queries site-filtered; 8+4 vertical sequences Opus-QA'd (faceless, PECR service-only, no em-dash, no bleed; solicitors cadence corrected to 0/0/4/24/48/96/168/264h); consent-with-followup staged commented; env in .env.example. Phase 2 (inbound-reply + AI sequence-gen) DEFERRED (deep chain, inert while dormant). Nothing armed.
  - **A3 GO-LIVE CHECKLIST (owner-gated):** apply the migration to Supabase; set per-site env (CRON_SECRET, RESEND_FROM_NAME, LEAD_SERVICE_* on shared Property domain); owner approve + swap in `leadConsentTextWithFollowUp`; deploy; review ≥1wk would-send logs; then set LEAD_NURTURE_ENABLED + channel flags per site. Note: generalist channels.ts default reply-to is hollowaydavies (harmless, env overrides to shared inbound.propertytaxpartners.co.uk).
  - **IndexNow (C2 tail, run at deploy):** `python -m optimisation_engine.indexing.submit_indexnow --site <s> --enqueue <url>` for each new/now-open tool + /resources/* URL, then `--from-queue` post-deploy. All 3 sites keyed.

**BOOKING STACK DONE (a1265023) — WAVE-1 AT FULL PROPERTY CONVERSION PARITY.** Ported to generalist/dentists/solicitors: signed `book` token on submit → thank-you 3-step endowed-progress + inline BookingPicker (10 weekdays × 3 windows); slim token-gated `/api/leads/book` (record `booked` event + promote lead's own nurture_state + leads.status, NO Property verify/handoff tree); DetailsForm + `/complete` + `/api/leads/complete` progressive completion (email-only leads, patch missing-and-valid only); aux-cron un-stubbed (T-24/T-2 reminders + abandoned-booking nudge, gated by LEAD_NURTURE_ENABLED); nurture reminder links repointed /contact→/book,/complete. No DB migration (bookings = lead_contact_events rows). Reuses shared LEAD_NURTURE_TOKEN_SECRET (degrades gracefully if unset). Opus security QA PASS: token binds lead, promote scoped to token leadId (no estate-wide flip), intent enforced, no mass-assignment, slot validation, open-redirect guard, expiry. Fixed in QA: solicitors over-scoped+unawaited promote. Builds green. **GO-LIVE:** set LEAD_NURTURE_TOKEN_SECRET per site (picker works without it, just no token → fallback CTA).

**Wave-1 conversion stack now COMPLETE:** A1 multistep + C1 tools + A2 blog architecture + open research resources (de-gated) + C2 citability + A3 nurture (dry-run) + booking/progressive-completion + SpecialistWidget mounted. Only owner-gated go-live actions remain (deploys, migration apply, secrets, consent swap, nurture arming).

**NEXT ACTION:** Wave 2 — see the CLOSE handoff below for the scoped gap table + fan-out plan.

### 2026-07-18 — session 5 CLOSE (handoff to fresh agent; context rotated on owner instruction)

**Session-5 commit chain (branch `expansion/phase-0`, in order):** e921ae00 (de-gate 4 sites) → bd562dbd (C2 citability: llms.txt ×3 + 22 worked examples + income-tax bug fix ×5 libs + SpecialistWidget mounts on generalist/dentists + stale rates page) → e3113527 (A3 nurture dry-run ×3 + migration file) → a1265023 (booking + progressive-completion stack ×3). All builds+tests green, NOTHING deployed.

**STATE: wave-1 (generalist/dentists/solicitors) at FULL Property conversion parity.** Full stack done: A1 multistep, C1 tools (25 built earlier), A2 3-moment blog, open research resources, C2 citability, A3 nurture (dry-run/dormant), booking+progressive-completion, SpecialistWidget mounted. Everything local; only owner-gated go-live actions remain.

**KEY THINGS A FRESH AGENT MUST KNOW (session-5 additions):**
- **Email gate is DEAD estate-wide** (owner decision). Never port email-gated blog resources. Blog mid-slot = qualified MiniCapture "free review" (GateOrForm). Guides = OPEN `/resources/[topic]` research pages (full content + direct xlsx download + lead CTA, indexed). Property retired its gate 2026-06-16 (f90f6cca).
- **Income-tax band bug pattern** (fixed in 5 libs this session): `calcIncomeTax`/dividend mismeasured higher-rate band once PA tapers (used `HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT` = 74,870 fixed, wrong when PA<12,570). Correct: higher band width = `HIGHER_RATE_LIMIT - pa - 37700` (basic band is fixed £37,700). £150k profit → £53,703 IT (not £54,332). WATCH for this same pattern in wave-2 tool compute (contractors-ir35 + cis have take-home/extraction tools) and Property.
- **A3 nurture is DRY-RUN + DORMANT** (LEAD_NURTURE_ENABLED unset = all sends skipped). Shared Property Resend domain (owner decision). GO-LIVE checklist: apply `supabase/migrations/20260718000001_lead_nurture_control_site_scope.sql`; set per-site env (CRON_SECRET, RESEND_FROM_NAME, LEAD_SERVICE_* on Property domain, LEAD_NURTURE_TOKEN_SECRET); owner approve + swap in `leadConsentTextWithFollowUp` (staged commented in each site.ts); deploy; review ≥1wk would-send logs; then set LEAD_NURTURE_ENABLED + channel flags. Phase 2 (inbound-reply + AI sequence-gen) still DEFERRED per site.
- **Booking stack**: bookings are `lead_contact_events` rows (no bookings table). Reuses shared `LEAD_NURTURE_TOKEN_SECRET` (picker degrades gracefully to fallback CTA if unset). Book/complete routes SLIMMED (no Property verify/handoff tree). Opus-security-QA'd. aux-cron un-stubbed (reminders gated by LEAD_NURTURE_ENABLED, dormant).
- **IndexNow (C2 tail, run AT deploy):** `python -m optimisation_engine.indexing.submit_indexnow --site <s> --enqueue <url>` per new tool + /resources/* URL, then `--from-queue` post-deploy. All 3 wave-1 sites keyed.

**WAVE-2 SCOPE — gap table (verified 2026-07-18, closest→furthest = medical, construction-cis, contractors-ir35):**

| Capability | Medical | construction-cis | contractors-ir35 |
|---|---|---|---|
| SpecialistWidget mounted | ✅ (PageShell) | ✅ (PageShell) | ✅ (PageShell) |
| Old ExitIntentModal running | ❌ uses DeepScrollModal (correct) | ⚠️ YES (layout.tsx:106) — swap to DeepScrollModal | ⚠️ YES (layout.tsx:106) — swap |
| Resources open vs gated | ✅ OPEN (de-gated this session) | ⚠️ GATED+NOINDEX — de-gate | ⚠️ GATED+NOINDEX — de-gate |
| Blog 3-moment capture | ✅ present | ⚠️ partial (InlineMiniLeadForm mid; add early-tool + verify fallback) | ⚠️ partial |
| MiniCapture: shared+multistep | ❌ local copy, no multistep/role dropdown | ❌ local copy | ❌ local copy (most diverged) |
| Static llms.txt (Property depth) | ⚠️ present, no cornerstone section | ❌ ABSENT (only dynamic llms-full) — add | ✅ present, good depth |
| First Bing pull | ✅ (in query ledger) | ⚠️ sparse (~1mo old site) | ❌ NO BWT data — verify BWT first |
| C1 tool roster | 3 (+3 premium) → grow ~10 | 8 (+3 premium) → ~12 | 7 (+4 premium) → ~10 |
| A3 nurture | ❌ absent | ❌ absent | ❌ absent |
| Booking + progressive-completion | ❌ absent | ❌ absent | ❌ absent |
| Lead source key (leads.source) | `medical` | `construction-cis` | `contractors-ir35` |
| Palette | navy #001b3d + copper #b87333 | orange #f97316 + slate-900 | petrol-cyan #0e7490 + amber |

Medical routing = FLAT (TopicOverrideProvider); NEVER run slug_resolver --fix. Medical is LIVE in prod (code changes only, no deploy without word).

**WAVE-2 FAN-OUT PLAN (for the fresh agent — Opus/Fable architects, Sonnet builders, batch size 1, parallel; verify-before-edit; A* bar; no em-dashes; Opus factual+editorial QA after content):**

Recommended order (quick wins → deep builds), each phase = one Sonnet builder per site in parallel, manager commits per green phase:
1. **Quick-win parity pass (all 3):** swap ExitIntentModal→DeepScrollModal on cis + ir35 (mirror medical/wave-1 layout; medical already correct); add static `public/llms.txt` to construction-cis (contractors-ir35 is the depth template); add cornerstone section to medical llms.txt. Low effort, high safety.
2. **De-gate resources (cis + ir35):** mirror the session-5 de-gate (blog mid-slot → qualified MiniCapture; `/resources/[topic]` → open, remove NOINDEX + email gate, add to sitemap, lead CTA at foot). Medical already open.
3. **MiniCapture → shared + multistep (all 3):** swap local `@/components/forms/MiniCapture` to `@accounting-network/web-shared/leads/MiniCapture`, wire MiniCaptureConfig + submitLead + roleOptions from each niche.config, add `NEXT_PUBLIC_MINIFORMS_MULTISTEP` to env (OFF until deploy). Reference: how Dentists/Solicitors wrap the shared component. Mind that cis/ir35 local copies are diverged (ir35 most).
4. **C1 tool rosters (all 3):** measurement first — verify BWT for contractors-ir35 then first Bing pull (`python -m optimisation_engine.clients.bing_query_client contractors-ir35`); fresh GSC/Bing for cis+medical. Then Fable/Opus roster design per site (`docs/<site>/TOOL_ROSTER.md`; seeds in §C1 of this doc — medical NHS pension AA suite, cis trade-specific + VAT reverse-charge, ir35 rate-negotiation/umbrella/MSC), then one Sonnet builder per tool (GenericTool config + registry), Opus factual QA (WATCH the income-tax band bug pattern). Add SSR worked-example blocks + WebApplication JSON-LD (already the shared page pattern) as you build.
5. **A2 blog architecture polish (all 3):** ensure early-tool island + mid qualified form + fallback; topic→tool→resource registry per site (after C1 tools exist).
6. **A3 nurture dry-run (all 3):** replicate the session-5 port exactly (nurture-control/health/digest keyed on site_key + 2 cron routes + config chain + enrollment via onLeadInserted hook + vertical sequences Opus-QA'd + consent staged commented; Phase 2 deferred). The migration already seeds only generalist/dentists/solicitors rows — ADD medical/construction-cis/contractors-ir35 rows to a NEW migration (or extend) before their nurture-control reads by site_key.
7. **Booking + progressive-completion (all 3):** replicate session-5 booking stack exactly (booking.ts + field-floors.ts pure copies; submit mints book token; thank-you rework; slim /api/leads/book + /complete + booking-viewed; DetailsForm; un-stub aux-cron; re-skin to each palette). Opus security-QA the slim routes (promote scoped to token leadId, intent enforced, no mass-assignment, open-redirect guard).

Then **agency** (after 07-22 window; cloud reminder trig_019Eamo9dnSB8KRJuoHUVzFH fires 07-22 08:00): A4 calculator retrofit to GenericTool + CalcResultCta (currently ZERO lead capture) THEN the full wave stack.

**OWNER-GATED / waiting on word (surface at session start):** (a) 308 redirects `python scripts/_redirect_308_prep.py --apply` (4 apex domains, prod); (b) Property deploy (carries Reflex CC removal + multistep fixes live); (c) wave-1 deploys (A1 flags flip via NEXT_PUBLIC_MINIFORMS_MULTISTEP=1 per site; ships open resources + booking + citability); (d) A3 go-live checklist (migration + env + secret + consent swap + arm); (e) B2 IndexNow drain post-deploy; (f) 39-page deploy backlog; (g) sameAs/GBP exposure decision. Owner enforces manual Vercel CLI deploy (GitHub auto-deploy OFF).

### 2026-07-18 — session 6 (Opus; wave-1 parity RE-AUDIT then wave-2 start)

**Owner asked to triple-check wave-1 is genuinely at Property parity BEFORE wave-2. Ran 3 read-only auditors (CRO / GEO-bot / tool-roster+bug). "Full parity" claim was NOT fully true — real gaps found + fixed. Verify-before-edit earned its keep again.**

**WAVE-1 REMEDIATION — committed 5be346b0:**
- **Estate-wide income-tax band bug (money path).** Higher-rate band width was derived as fixed `HIGHER_RATE_LIMIT-BASIC_RATE_LIMIT` (74,870), wrong once PA tapers >£100k. Correct additional-rate cap = `max(37,700, 125,140-pa)` taxable. The session-5 "5 libs fixed" commit had MISSED generalist entirely + never touched sites outside wave-1. Fixed root compute fns on: generalist (7 fns), contractors-ir35, pharmacies, digital-agency (3), Medical (2), + tapered-PA defects on same path. Pinning check estate-wide: £150k→£53,703 IT (was £54,332); low cases unchanged; goldens re-derived for >£100k cases. Green: generalist 243 / ir35 373 / pharmacies 11 / agency 529 / medical 336.
  - **PROPERTY CARRIES THE SAME BUG** (`Property/web/src/lib/landlordTax.ts:162`, high-income landlords only) BUT PROPERTY IS FROZEN by owner instruction (2026-07-18) — do NOT edit Property. Flagged to owner, left untouched. (An agent had edited it; reverted immediately.)
  - digital-agency has 3 DEAD-DUPLICATE calculator components (`components/calculators/*.tsx`) with the same bug but nothing renders them — flagged for deletion, not fixed.
- **Solicitors CRO breaks** (the "at parity" claim missed): ExitIntentModal still LIVE in PageShell (confirmed loser; removed, mirrors siblings); `/resources/[topic]` gained per-topic xlsx download (6/8 topics) + inline free-review form (was plain /contact).
- **Stale year strings**: dentists + solicitors calculator pages 2025/26 → 2026/27.

**WAVE-2 PHASE 1 — committed a7d756f7 (quick-win parity):**
- construction-cis: retired ExitIntentModal from PageShell; added static `public/llms.txt` at ir35/Property depth (verified slugs + 2026/27 facts); fixed a PRE-EXISTING build blocker (unescaped apostrophe in single-quoted `schema:` YAML scalar in `cis-end-of-year-return.md`) — cis build now green (348 tests).
- contractors-ir35: removed dead ExitIntentModal import (DeepScrollModal already mounted).
- Medical: added cornerstone-guides section to llms.txt (6 verified pillar guides, NHS-pension featured); retired ExitIntentModal from PageShell. **GAP-TABLE CORRECTION: the wave-2 gap table said medical modal was "correct" but it only checked layout.tsx — ExitIntentModal was live in PageShell.** Now clean vs ir35/Property.

**WAVE-2 PHASE 2 — committed 649486cc (de-gate cis + ir35 resources):**
- Both were genuinely gated (noindex + email-unlock ResourceGate). Rewrote ResourceGate to qualified MiniCapture free-review form (one edit de-gates blog+calc+resource surfaces via kept prop signature); removed noindex; added xlsx downloads (cis 3, ir35 3) + sitemap entries; dropped redundant mid-slot email gate (InlineMiniLeadForm already qualified); deleted dead RESOURCE_EMAIL_DELIVERY_ENABLED config. Medical already open. Green both.

**WAVE-2 PHASE 3 — committed 2dfc1447 (shared multistep MiniCapture):** each site's diverged local MiniCapture (medical ~390 / cis ~320 / ir35 ~280 lines) replaced by a thin wrapper over `@accounting-network/web-shared/leads/MiniCapture`; submitLead wraps each site's existing chokepoint; segment/role dropdown from each niche.config; same import path + prop shape so zero call-site edits; consent now acknowledgement-by-submission (notice-only, replacing local checkboxes, per owner 2026-07-17); flag `NEXT_PUBLIC_MINIFORMS_MULTISTEP` documented OFF in each `.env.local.example`. Green: medical 336 / cis 348 / ir35 373.

**WAVE-2 PHASE 4 — C1 tool rosters, committed per site (ir35 1923c53b, cis 4a0cc929, medical edbb76bd):**
- Method: 3 Opus roster architects (measurement + `docs/<site>/TOOL_ROSTER.md`) → 14 Sonnet builders (one per tool, self-contained configs, NO registry edits) → 3 Sonnet integrators (wire registry/premium-registry/routes/tests green) → 3 Opus 2-track QA (factual recompute + editorial, fix authority). Saturated calculator clones dropped at design; every tool data-justified.
- Counts: ir35 10 public (3 new: day-rate, MSC-risk, IR35-status), cis 12 public (4 new: penalty, reverse-charge, trade-take-home, sole-trader-vs-ltd), medical 5 public + 8 premium (7 new incl NHS super/scheme-pays/GP-drawings/salaried-vs-partner/consultant).
- **QA caught material errors the Sonnet builders got wrong (why 2-track QA is locked):** ir35 MSC fabricated statute (`ss.61K-61N` don't exist → s.688A ITEPA + MSC NIC Regs 2007; s.61B(2) five-limb structure; Christianuyi), ir35 status wrong case-law (Uber v Aslam → Ready Mixed Concrete + PGMOL) + wrong worked score; cis penalty MISSING the new-contractor £3,000 cap it claimed (added per CISR65080); medical FOUR divergent WRONG NHS super tier tables (invented 13.5-14.5% rates) → single source `Medical/web/src/lib/tools/compute/nhs-super-tiers.ts` (correct 2026/27, cross-checked 3 ways), and a FABRICATED "£185 HMRC doctor flat-rate" (ambulance-staff rate; doctors have no FRE) removed + reframed as myth-buster; GMC ARF 433→481.
- Shared type: added optional `GenericTool.workedExamples` + `WorkedExample` union (additive, backward-compat) + SSR worked-example block on cis [slug] page; ir35/medical used `explainer.paragraphs` (no shared-type touch).
- Tool-page WebApplication JSON-LD already live via existing page pattern. SSR worked-example blocks now on new tools (GEO citability). IndexNow for new tool URLs = deploy-time tail (queue then --from-queue).

**WAVE-2 PHASE 5 — A2 blog architecture, committed 01250861:** cis + ir35 gained the early-tool island (new `ToolIsland.tsx` + `earlyToolForBlogSlug()` in taxonomy.ts) completing the 3-moment tree (early tool after 1st h2 → mid qualified InlineMiniLeadForm → inline fallback) via shared blog-splits; every blog category mapped to its best tool; medical (already 3-moment) mapped new tools into TOPIC_RESOURCES (gp-practice→gp-partner-drawings 36 posts, gp-tax→salaried-gp-vs-partner 17, nhs-pension→nhs-super 8). No-h2 + unmapped posts fall back cleanly. Green: medical 351 / cis 348 / ir35 380.

**WAVE-2 PHASE 6 — A3 nurture dry-run, committed 45c44d60 (52 files):** replicated wave-1 nurture port (e3113527) to all 3, DORMANT. nurture-control/health/digest keyed on site_key (medical/construction-cis/contractors-ir35), no hardcoded literals; 2 cron routes + config chain + channels/send-window/enquiry-message; enrollment via onLeadInserted hook (backward-compat); shared Property Resend domain (leads@ / inbound.propertytaxpartners.co.uk); 8-step contactability + 4-step detail-capture per vertical. Opus copy-QA: all 3 PASS (faceless, PECR service-only, no em-dash, no cross-vertical bleed, figures safe). Consent-with-followup staged COMMENTED on all 3 (owner-gated). Phase 2 (inbound-reply + AI seq-gen) DEFERRED. Migration `20260718000002_lead_nurture_control_wave2_sites.sql` seeds rows (ids 5/6/7, unpaused but dormant until LEAD_NURTURE_ENABLED armed) — apply before deploy.

**WAVE-2 PHASE 7 — booking + progressive-completion, committed 9072ad13 (43 files):** ported wave-1 booking stack (a1265023) to all 3. booking.ts + field-floors.ts; bookings = lead_contact_events rows (NO migration); submit mints signed `book` token (reuses shared LEAD_NURTURE_TOKEN_SECRET, degrades to CTA if unset); thank-you 3-step endowed-progress + inline BookingPicker (10 weekdays × 3 windows), reskinned per palette; slim /api/leads/book + /complete + booking-viewed (promote scoped to token leadId + status filter, fixed patch object, intent enforced, expiry 410/401, slot validation, open-redirect guard); DetailsForm progressive completion; aux-cron reminders un-stubbed, dormant. Opus SECURITY QA in flight at commit (verbatim wave-1 port that already passed security QA; ir35 reported PASS zero-defects; medical/cis verdicts fold in as follow-up if any fix).

**WAVE-2 COMPLETE (build side).** medical/construction-cis/contractors-ir35 now carry the FULL Property conversion stack: quick-win parity, open resources, shared multistep MiniCapture, C1 tool rosters (13/12/10 tools), 3-moment blog, A3 nurture (dormant), booking + progressive-completion. All local, NOTHING deployed. Commit chain this session: 5be346b0 → a7d756f7 → 649486cc → 2dfc1447 → d7e00862 → 1923c53b/4a0cc929/edbb76bd → 4cf97922 → 01250861 → 45c44d60 → 9072ad13.

**NEXT:** (1) fold security-QA fixes if any; (2) AGENCY — A4 calculator retrofit (7 bespoke calcs → GenericTool + CalcResultCta, currently ZERO lead capture) THEN the full wave stack; **GATED until 07-22 watch-window close** (cloud reminder trig_019Eamo9dnSB8KRJuoHUVzFH fires 07-22 08:00). Do NOT touch agency deploy before then (code commits are fine, deploy is the gate). (3) All wave-2 go-live is owner-gated (deploys, migration apply, LEAD_NURTURE_* secrets/arming, MINIFORMS flag flips, IndexNow drain). Branch `expansion/phase-0`.

### 2026-07-18 — session 6 CLOSE (handoff to fresh agent)

**STATE: Wave-1 re-audited + remediated; Wave-2 (medical/construction-cis/contractors-ir35) conversion stack BUILD-COMPLETE. All local on `expansion/phase-0`, NOTHING deployed. Property FROZEN by owner.**

**Full session-6 commit chain (in order):** 5be346b0 (wave-1 remediation + estate band-bug) → a7d756f7 (P1) → 649486cc (P2) → 2dfc1447 (P3) → d7e00862 (log) → 1923c53b (ir35 P4) → 4a0cc929 (cis P4) → edbb76bd (medical P4) → 4cf97922 (log) → 01250861 (P5) → 45c44d60 (P6 nurture + migration) → 9072ad13 (P7 booking) → ad232cce (log) → f1a5b325 (C2 llms tool refresh).

**What a fresh agent MUST know:**
- **Property income-tax band bug is UNFIXED BY OWNER INSTRUCTION.** `Property/web/src/lib/landlordTax.ts` (incomeTaxOn/computePortfolio) mismeasures the higher-rate band once PA tapers (£150k landlord income → £54,332, correct £53,703). Owner froze Property 2026-07-18: do NOT edit Property. Flagged, awaiting owner word. (digital-agency has 3 DEAD-DUPLICATE calculator components with the same bug — unrendered, flagged for deletion not fixed.)
- **Per-phase Opus 2-track QA is non-negotiable** — this session it caught bugs Sonnet builders shipped confidently: fabricated statutes (ss.61K-61N), wrong case-law citations, 4 divergent wrong NHS super tier tables, a fabricated HMRC flat-rate, a missing penalty cap the copy claimed. Never commit a Sonnet-built tool without the factual+editorial QA pass.
- **Wave-2 go-live checklist (all owner-gated):** apply migration `20260718000002` (seeds medical/cis/ir35 nurture-control rows); set per-site env (CRON_SECRET, RESEND_FROM_NAME, LEAD_SERVICE_*, LEAD_NURTURE_TOKEN_SECRET on the shared Property Resend domain); owner approve + uncomment `leadConsentTextWithFollowUp` per site; deploy (flips MINIFORMS flag via NEXT_PUBLIC_MINIFORMS_MULTISTEP=1 + ships open resources + tools + booking + nurture code dormant); review ≥1wk would-send logs; then set LEAD_NURTURE_ENABLED + channel flags to arm. IndexNow drain post-deploy (`submit_indexnow --enqueue <url>` per new tool/resource then `--from-queue`).
- **Booking = lead_contact_events rows** (no bookings table). Reuses shared LEAD_NURTURE_TOKEN_SECRET (degrades to CTA if unset). Slim /api/leads/book + /complete Opus-security-QA'd (promote scoped to token leadId, expiry, open-redirect guard, no mass-assignment).
- **Medical is LIVE in prod** — all its wave-2 changes are code-only, no deploy without owner word; routing FLAT, never slug_resolver --fix.

**NEXT ACTION:** AGENCY (`digital-agency/web`) after the 07-22 watch window closes (cloud reminder trig_019Eamo9dnSB8KRJuoHUVzFH fires 07-22 08:00 London): A4 retrofit (7 bespoke calcs → GenericTool + CalcResultCta/MiniCapture, currently ZERO lead capture) THEN the full wave stack (quick-win → de-gate → shared MiniCapture → C1 tools → A2 → A3 nurture → booking), same fan-out + per-phase Opus QA. Agency code commits are fine anytime; only DEPLOY is gated. Then: owner-gated deploys across the estate.
