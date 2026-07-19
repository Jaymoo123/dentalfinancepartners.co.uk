> Approved 2026-07-19 (owner, CRO-first verdict). Day-1 executed 2026-07-19 — see docs/_engines/logs/SESSION_2026-07-19_GROWTH_DAY1.md. Source plan: .claude/plans/i-want-us-to-eager-cocke.md.

# Estate growth plan v4 — CRO-first, everything verified (2026-07-19)

## Context
Owner asked what the real lever is: more sites, more pages, or CRO. After fresh direct-API pulls, a ship-manifest audit of the 2026-07-19 go-live, and three deep design passes (all claims below code-verified by planners, not assumed):

**Verdict: CRO on existing traffic is the bottleneck.** Estate does 925 Google clicks/28d (Property 510 ≈ 18/day) + ~1,278 Bing clicks but only 59 leads/30d. Property converts ~1,050 clicks → 46 leads; solicitors ~379 clicks → 1; dentists ~203 → 1. Conversion parity shipped 07-19 (multistep, tools, blog capture, booking on all 6 non-Property sites) — the work now is arming the dormant layers, measuring, and executing the approved growth programs. Not more pages (depth is 58-697 posts/site; generalist has 14.7k Google impressions at pos ~50 — pages don't fix position). Not more sites (7 expansion sites live 07-16, yield 6-12 months out).

**Standing corrections locked in** (fix stale claims wherever seen):
- Supabase Management-API token is VALID (growth-doc "403 BLOCKED" note is stale).
- All estate sites ARE registered in Bing WMT; the 8 pull failures are client config (see 1.4).
- `gsc_query_data` Supabase table is PARTIAL — never use for traffic totals; pull GSC API date-only (`scripts/_fresh_gsc_bing_pull.py`, created this session).
- Owner rules this session: arm nurture now; no SMS ack (verification SMS+email already fires on submit); no per-site Resend domains; drop embeds/subscriber-capture/referral-mesh/multi-buyer-monetisation/paid (later); Property stays FROZEN; local layer YES; GEO "to the nth degree"; assistant build-out YES with data-pass first.

**Confound policy** (reconciles "don't wait" with locked isolate-variables rule): parallel workstreams proceed on DISJOINT URLs. Never stack meta_fix + corepage rewrite + schema pass on the same URL in the same week. Nurture arming moves lead→contact rate, not session→lead, so it cannot pollute the multistep readout. GEO moves AI/Bing channels. Flagships are net-new pages. The one true collision — corepage targets vs serp-meta batch-2 held pages — is handled by a monitored_pages overlap check before each run; overlapping URLs defer to 08-05. Any owner-forced stack gets recorded in EXPERIMENTS.md so attribution stays honest.

---

## 1. Arm the machine (Week 1, days 1-2)

### 1.1 Nurture arming (~0.5 day, highest priority, no code changes)
Code-verified facts: master flag `LEAD_NURTURE_ENABLED` + per-channel `LEAD_NURTURE_EMAIL_ENABLED`/`_SMS_`/`_WHATSAPP_` + `LEAD_NURTURE_AUTOPAUSE_ENABLED` (`generalist/web/src/lib/leads/channels.ts`, identical per site). DB kill switch `lead_nurture_control` per site_key, read fail-open. **Retro-blast is structurally impossible at arm time**: `enrollLead` returned `{reason:"dormant"}` all month, so no dormant-period leads sit in `lead_nurture_state`; arming affects only post-flip leads. Do NOT run retro-enrol/reconcile on the 6 sites.

Steps:
1. Apply `supabase/migrations/20260718000001` + `20260718000002` via `scripts/_q.py` (Management API; token valid). First verify current state — main commit 4039faae suggests 000001 may already be applied: `select id, site_key, paused from lead_nurture_control order by id;` expect 7 rows.
2. Pre-arm sanity (minutes): `lead_nurture_state` active count = 0 for the 6 sites; hit each `/api/cron/lead-nurture` with `Bearer $CRON_SECRET` while dormant → `armed:false, dispatched:0` + `last_cron_run_at` updates; `vw_lead_nurture_health` returns a row per site.
3. Flip per site (Vercel Production env + redeploy): `LEAD_NURTURE_ENABLED=1`, `LEAD_NURTURE_EMAIL_ENABLED=1`, `LEAD_NURTURE_AUTOPAUSE_ENABLED=1`. SMS/WhatsApp stay unset. Order: generalist → dentists → solicitors → medical → construction-cis → contractors-ir35. Property untouched.
4. Post-arm hour-1 checks per site: cron `armed:true`; `source='test'` lead creates state row without touching providers; watch `lead_nurture_sends` for first real lead; digest cron next day. Partner-vs-subscriber email routing rule holds (partner CC only real leads).
5. Rollback ladder: DB `paused=true` upsert (instant) → env unset + redeploy → migration-footer SQL (near-never).

Risk: shared Resend from-domain reputation — mitigated by autopause on day one + daily digest review week 1. Per-site control rows mean one site's autopause no longer pauses the estate (the original incident amplifier is gone).

### 1.2 CRO measurement loop (~2-3 hrs, parallel)
The blocker is LOCAL, not the sites: `/api/track` already writes (web_sessions has data). Ensure `SUPABASE_SERVICE_ROLE_KEY`/`SUPABASE_KEY` in repo `.env`, then run the five existing detectors in `optimisation_engine/analysis/behaviour_detectors.py` (`detect_funnel_dropoff`, `detect_calculator_abandon_before_lead`, `detect_cta_ignored_high_traffic`, `detect_form_field_abandonment`, `detect_rage_click_ux_bug`) per site; deep-dive with `scripts/_form_dropoff_eval.py`. Priority read-out: cro_form + cro_funnel on solicitors and dentists (worst converters). Cadence: daily sweeps for 2 weeks post go-live, then weekly via `weekly_run.py`. Low-traffic sites: aggregate 28d windows, don't lower min_sessions=50. Verify one cro_form finding against raw web_events.

### 1.3 Assistant data pass (~2 hrs, read-only)
Widget (`SpecialistWidget.tsx`) is deployed estate-wide, deterministic (not an LLM), stamps `extras.capture_channel='assistant'`. Run via `scripts/_q.py`: leads by capture surface per site 30d; widget open→compose→send funnel from web_events (grep exact `track(` event names first); downstream quality (booked/replied) for assistant leads. Output decides §3.3 mode question.

### 1.4 Plumbing fixes
- **Bing client**: `optimisation_engine/clients/bing_query_client.py` `DEFAULT_SITE_URL` (lines 71-83) has 3 `.invalid` placeholders (charities/hospitality/care) and is missing 4 sites (pharmacies/crypto/ecommerce/startups-tech); fill from `optimisation_engine/indexing/config.py` hosts, `--inspect` to pin exact BWT strings, then pull ×15. Also first-ever dentists Bing snapshot (0 rows today).
- **Monitoring**: Weekly Optimisation Engine workflow is enabled but last 3 runs FAILED (exit 1) and it runs `main`, which is behind `expansion/phase-0`; tripwire yml sits on the branch (cron only fires from default). One move fixes both: **merge branch → main (owner OK first)**, dispatch manually, verify green. Generalize deploy_watch cron (hardcoded Property/miniform) now that multistep is live on 6 sites; insert medical/agency verdict rows (due 07-20/07-22).
- **Medical MED-F2**: binary owner question — was Request Indexing done? If not: owner does ~10 core URLs now (GSC UI quota ~10/day), log dates in STATE.md. Also ship the local-only domain-alignment deploy (79 files, gate with `scripts/medical_flat_link_audit.py`, NEVER slug_resolver). Authority-wall pivot decision checkpoint 08-03: if core pages still unknown → accelerate medical flagship distribution + entity layer + Bing-first posture (medical IS indexed on Bing; Bing grounds Copilot). Get flagship data-source sign-off NOW so 08-03 isn't blocked on it.
- **Doc/memory corrections** per standing-corrections list above.

### 1.5 Stale-figure sweeps (manager-direct, minimal edits, locked rule)
Regenerate hit-lists first — sessions 2/5/6 already fixed much of the NIC/AMAP lists; don't redo. Open: generalist glossary BADR-vs-20%-CGT arithmetic + dividend leftovers; agency R&D (~60 files) + NIC (~45 pages) clusters; solicitors AMAP 55p residue + 179 em-dash lines; agency employer-NIC incl. hardcoded 9100 in `EmployerNICalculator.tsx`/`SalaryDividendCalculator.tsx`; dentists 27×45p mileage. Date-banded historic figures are correct — no blind replace. Each sweep ends: build, deploy, verify live, IndexNow. **These gate IndexNow-on-write (2.1.A0.4): de-stale BEFORE acceleration.**

---

## 2. Search visibility (Weeks 1-3, parallel on disjoint URLs)

### 2.1 GEO / AI-search program — full execution (owner: "nth degree")
Source: `docs/_engines/AI_SEARCH_GEO_PROGRAM.md` (+ handover). Measurement layer already live; only fragments shipped. Engine builds first (parallel with §1 sweeps):
- **A0.2** Schema applier upgrade: extend `VALID_SCHEMA_TYPES` in `optimisation_engine/apply/schema_only.py` (Dataset, WebApplication, SoftwareApplication, CollectionPage, DefinedTerm) → estate `@graph` rollout per site. Verify: Rich Results test on 3 URLs/site.
- **A0.3** BLUF answer-box + DefinedTerm shared component in web-shared (`directAnswer` frontmatter → `<div role="note">` after H1); close 7 writer-prompt gaps in `scripts/track2_rewrite_writer.wf.js`; directAnswer backfill rides rewrite waves.
- **A0.4** IndexNow-on-write hooks (`apply/meta_only.py` + track2 writer → `indexing/submit_indexnow.py` queue, add persistence/replay). **After sweeps only.**
- **A0.5** Bing-family levers: activate `GetQueryStats` (Bing-only demand discovery), wire `GetAiPerformance` → `bing_ai_performance` table via weekly_run — this is the Copilot lever (Bing grounds Copilot + ChatGPT Search).
- **A0.6** Robots parity (40-bot allow-list, training/retrieval split, `/api/` disallow) on dentists/medical/solicitors + root-layout Organization/WebSite/sameAs entity block estate-wide (doubles as local-layer entity foundation).
- **A0.7** llms.txt FULL per site (Property-style Key Facts, per-URL `utm_source=chatgpt/perplexity/copilot` for dark-traffic recovery); fix agency llms.txt pointing at nonexistent routes.
- **A0.8** AI-answer monitoring BEFORE waves ship: BWT AI Performance ingestion + weekly scripted 10-15-question citation battery per niche (dated JSON in docs/_engines/), console panels exist.

Per-site waves (Opus briefs, Sonnet writers, batch size 1, Haiku verify), order: **generalist → solicitors → dentists → medical (post-indexing verdict) → agency (post-07-22) → property (staged, frozen)**. Content = ~10 cornerstone citability rewrites per site (BLUF, date-banded rates, self-contained FAQs, DefinedTerm). Solicitors precondition: unblock + deploy the 45+33 corpus (`&`-slugify fix in slug_resolver/track2_link_audit + predeploy category-hub false-fail + owner sign-off on 169-row mark_used), then IndexNow ~183 URLs. Exclude each site's corepage-run URL from its citability wave (isolation).

### 2.2 Corepage runs (Tier 1)
Step 0 (both): parameterise the Property-only engine — add `CORE_PAGES` entries in `optimisation_engine/corepage/config.py`, per-site `ROOT_TOKENS` in `term_analysis.py`, un-hardcode `guide_audit.py` BLOG path. Pre-check: monitored_pages overlap vs serp-meta batch-2 holds; overlapping URLs defer to 08-05.

**B1 Solicitors /services** (pos ~51-61, ~1,100 head impr, 0 clicks): config → `--dry-run` → full run `python -m optimisation_engine.corepage --site solicitors --page services --refresh-gsc` → Opus brief (includes: /services owns head family; **/contact holds pos 18-22 "accountant for lawyers" — moving that query needs explicit owner OK**; catcher pages get link-ups + softened titles) → Sonnet implements (TSX metadata/H1/intro/FAQ 8-10/schema builders/catchers, no redesign) → predeploy gate + fact-check + no em-dashes → deploy + IndexNow. Success: head family 61→<30 in 6 weeks. Precondition: corpus deploy unblock (above).

**B2 Dentists homepage** (4,837 impr head terms, pos 32-76, 1 click): same pipeline; brief handles /blog index head-term leak (anchors, not blog expansion) and London chooser post cannibalisation (soften to long-tail); supporting service page decision deferred to +6 weeks. Precondition: deploy dentists 18-page backlog first so ~08-05 ledger re-run has a clean base. Success: cluster → pos <20, first meaningful clicks.

### 2.3 Query-ledger Tier 2/3/4 (disjoint URLs, `optimisation_engine/apply/` writers)
- **C1** Generalist meta batch (5 pages from generalist_ledger.md: cgt-reporting-2026, cgt-rates snippet fix only — **cluster siblings held to 08-05, don't touch**, integral-features, confirmation-statement-penalty, trivial-benefits). Measure CTR vs expected-by-position curve +3/+6 wks.
- **C2** Generalist construction-accounting-software expand (3,678 impr, 0 clicks, absorbs ~750 unowned): Opus gap brief → Sonnet expand → comparison tables + FAQPage → deploy.
- **C3** Solicitors client-account-reconciliation depth-out (after corpus unblock): SRA rule 8.3 process, worked example, HowTo schema.
- **C4** Tier-4 new pages: generalist /locations/st-albans (~660 impr — built to §2.4 anti-doorway standard) then Cannock only after St Albans earns; solicitors client-money-in-business-account; barrister-accountants default = don't build (intent flag). Property LBTT staged for unfreeze.
- **C5** Hygiene: dentists 5-URL flat-301 batch; noise_filter add "djh business advisers limited"; agency AIA page after 07-22.

### 2.4 Local layer (owner YES — designed conservatively)
- **Entity layer first, estate-wide** (zero risk): root-layout Organization + parentOrganization → Ashfield Trading Ltd + Companies House sameAs (= A0.6).
- **Owner DECIDED: NO GBP at all** (suspension risk not worth it). Local layer = Bing Places + on-site entity/location pages only.
- **Owner inputs needed at Bing Places setup**: trading address + public-OK?, phone, which brand(s) first.
- **Location pages: demand-led only, never speculative city grids** (strongest doorway defence). Standards per page: ledger-verified demand, genuine local angle (local rates/ONS/CH regional data), unique FAQ from that city's actual queries, A* human-voice bar, `ProfessionalService` schema with areaServed (not fake address), 1-2 pages/site/wave max. Template: `Property/web/src/app/locations/[slug]/page.tsx` + `packages/web-shared/schema/local-business.ts`.

---

## 3. CRO build tier (Weeks 2-4)

### 3.1 Property-extras port to 6 sites (~2-3 days)
Sources located: `Property/web/src/components/property/ServiceTiers.tsx` + `StatsBar.tsx`, richer LeadForm fields (situation/prompted/callGoal) in `Property/web/src/components/forms/LeadForm.tsx`. Extract to `packages/web-shared/components/` config-driven (pattern ec38f821); **leave Property untouched** (frozen — copy out, don't refactor). Per-site tier/stat config needs owner copy input per niche (dentists tiers ≠ IR35 tiers; draft from each services page; honest stats only — no fabricated urgency, owner signs copy). Thread the 3 form fields through `extras` (submit routes accept arbitrary JSON). Fields optional/step-2; measure completion via cro_form detector before/after (§1.2 dependency). QA: preview deploy + manual walk + test-lead extras check, then promote. digital-agency already has copies — retrofit to shared version opportunistically.

### 3.2 Data-PR flagships (owner YES)
**Four indexes already exist — reuse the factory, don't redesign**: Property Landlord Tax Index (live), medical Annual Allowance Pension Tax Index (BUILT — `Medical/web/src/app/research/annual-allowance-pension-tax-index/`, program in `docs/medical/RESEARCH_ASSET_STATE.md` + `docs/medical/research/DESIGN_BRIEF.md` = the playbook), cis UK Construction Index + ir35 UK Contractor Index (deployed 07-19). All 7 expansion verticals have source-verified `expansion_research/tier1_*/DATA_ASSET.md` proposals.
Build order (each ~1-1.5 wks, clones medical P1 manifest → P2 locked brief → P3 3-lane build → P4 recompute-QA; **owner data-source sign-off gate per asset**):
1. Dentists **Dental Pay & Tax Index** (NHS Digital Dental Earnings & Expenses, NHSBSA, HMRC SA, ONS ASHE — clearest dataset).
2. Solicitors **SRA Enforcement Index** (public decisions; P1 verifies licence terms).
3. Medical: distribution + July refresh only (built).
4. Generalist **SME Tax Burden Tracker**; 5. Agency benchmark post-07-22.
Faceless distribution: press-release.md pattern (live for property+medical — "free to use with a link", no spokesperson) to trade desks; journalist data-request feeds; per-vertical "statistics 2026" citation roundup pages (net-new = zero confound); EmbedAttribution chart embeds; llms.txt inclusion. Measure: SE Ranking backlink pulls, referrers in web_sessions, GSC/Bing on /research URLs, monitored_pages rows.

### 3.3 Assistant v2 (last, gated on §1.3 data pass; ~1-2 weeks)
Mode call: hybrid recommended — informational grounded answers with capture as natural terminus; §1.3 funnel decides per site (opens high/sends low → LLM answers help; opens low → placement problem, LLM won't fix). Architecture: web-shared assistant module + per-site streaming `/api/assistant/chat`; grounding = house_positions + services + per-site blog corpus, retrieval = taxonomy/topic routing first (pgvector only if quality demands); tool-calling into existing calculator libs; qualifying-intent handoff to existing multistep composer with `extras.capture_channel='assistant'` (nurture already special-cases it). Model tiering per locked rule: Haiku live turns, Sonnet build, Opus offline distillation/eval. Caps: per-turn tokens, ~10 turns/session, daily per-site spend, fail-closed to deterministic FAQ. Rollout: generalist → dentists → solicitors → medical → cis → ir35; Property v1 stays until unfreeze. Experiment: visitor-hash 50/50 LLM vs deterministic, metric = leads per widget-open + booked rate; low-traffic sites pool estate-level. Risks: hallucinated tax advice (grounded-only + refusal + house-positions hard negatives), cost runaway (caps), miniform cannibalisation (experiment isolates).

---

## 4. Calendar + owner moments (next 4 weeks)
- **W1 (now)**: §1 all + **merge expansion/phase-0 → main (owner APPROVED)**; GEO engine builds A0.2/5/6/7/8; corepage config; citation baseline; sweeps. Decided: /contact→/services query migration APPROVED; GBP = NO (Bing Places only). Still owed by owner: MED-F2 answer, flagship source sign-offs (medical esp., pre-08-03), Bing Places address/phone/brand, solicitors mark_used sign-off.
- **07-22**: agency window closes → if impressions hold: deploy + full stack retrofit + AIA page + benchmark flagship slot.
- **W2**: corepage B1/B2 (post overlap-check); GEO generalist+solicitors waves; A0.4 IndexNow-on-write (post-sweeps); C2/C3; entity layer + St Albans; Property-extras port builds; dentists Dental Pay & Tax Index P1.
- **W3**: GEO dentists wave; Property-extras preview QA + deploys; SRA Enforcement Index P1; assistant v2 build start (if data pass supports).
- **08-03**: medical authority-wall decision. **08-05**: serp-meta batch-2 closes + wave-1 CRO readout (fresh pulls via `_fresh_gsc_bing_pull.py`, session→lead per site vs 07-19 baseline) + ledger re-runs per site. **08-06**: Property miniform day-28 → owner unfreeze decision → staged Property items (landlordTax.ts band bug, Reflex CC removal live, assistant, LBTT page, city-page enrichment, `capital-gains.ts:196` otherIncome max 200000 clamp bump).

## 5. Verification (per locked rules)
- Every ship: build green + `scripts/predeploy_gate.py` + preview-gate + manual walk; fact-check vs ground-truth memory entries; no em-dashes.
- Nurture: §1.1 step-2/4 queries; test lead through full path per site; daily digest review W1.
- Traffic claims: fresh API pulls only, never stored tables.
- Detectors: opportunities rows land; one finding spot-checked vs raw web_events.
- Corepage/meta/GEO: weekly GSC page×query on target families; citation battery deltas +2/+6 wks; ledger re-runs as holds expire.
- Deploys one site at a time via `./scripts/deploy-and-index.ps1 -Site <key>`; auto-commit OFF respected.
