# Estate CRO Parity Program — state doc (the continuity artifact)

> **If you are a fresh agent taking over: read this file top to bottom, then do the RESUME HERE step at the bottom. No conversation context is required.**
> Full plan: `C:\Users\user\.claude\plans\okay-we-are-going-synchronous-peach.md` (this doc is self-sufficient for execution; the plan adds exploration detail).
> Model tiering (locked): Sonnet sub-agents BUILD (parallel, non-overlapping file packages); Opus sub-agents write per-niche copy + adversarial QA; the manager/architect personally does ALL git, migrations, `packages/web-shared` edits, gates, deploys, rollbacks. Haiku: mechanical greps only.

## Mission
Bring all 7 non-Property sites to **FULL PARITY** with Property's on-site conversion machinery (per-niche adapted) so they produce leads at Property-like rates. Property itself must not be touched, deployed, or harmed. The ONLY permanent difference: lead post-processing (Property = DJH agreement + nurture/handover; others = capture → owner notify + Reflex CC, no nurture).

## Locked owner decisions (2026-07-05)
1. FULL PARITY (mirror Property exactly, niche-adapted); parity matrix per site vs `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md` (71 capabilities).
2. Wave 1 trial = generalist + Solicitors; then Dentists → Medical → cfp+cis twin → agency (re-validate order with LIVE traffic query at each wave gate).
3. Lead routing unchanged: non-Property leads → owner inbox (junaydmoughal@hotmail.co.uk) + Reflex CC. Keep as-is; no Property-side routing changes.
4. Form depth: LIGHTER qualified pattern (role + niche qualifiers + name/email/phone mandatory, message optional ≥10 chars when present, consent checkbox kept). NOT Property's 7-field form.
5. Generalist ships its existing undeployed backlog FIRST (G-0) as its own gated release, then the CRO wave (G-1).
6. END all running A/B experiments on non-Property sites; hardcode best arms (generalist `calc_promo_inline`, construction-cis `personalization`→ON). NO new experiments this program. Personalisation = default-ON everywhere.
7. In-blog premium calculators + ResultGateModal IN scope (build embeds first, then gates). SpecialistWidget + proactive assistant IN scope. Newsletter surfaces DROPPED from non-Property sites (generalist newsletter exit modal retired).
8. Live-form probe once per site at launch: YES, but Reflex must NOT be CC'd → probe goes through the real form with `probe_secret` matching env `LEAD_PROBE_SECRET`, server overrides to `source='test'` (operator-only routing, no CC, no enrichment).
9. Nurture for non-Property sites: OUT of scope.
10. Owner sign-off REQUIRED before every deploy. Commit baselines before changes. Verification suites before deployment, always.

## Live ground truth (2026-07-05, queried web_sessions/leads directly — ALWAYS re-query live, never trust repo docs for volume)
| site | sessions/30d | 7d pace/day | leads/30d | conv |
|---|---|---|---|---|
| property | 4,206 | ~147 | 33 | 0.78% |
| generalist | 993 | ~53 | 3 | 0.30% |
| solicitors | 931 | ~47 | 1 | 0.11% |
| dentists | 291 | ~12 | 1 | 0.34% |
| medical | 235 | ~14 | 4 | 1.7% |
| construction-cis | 106 | ~4 | 0 | — |
| contractors-ir35 | 60 | ~3 | 0 | — |
| agency | 37 | ~1.4 | 0 | — |
Wave-1 prize at Property's 0.78%: generalist + solicitors ≈ 7-8 leads/mo each (11-12 at 7d pace) vs 3+1 today.

## Architecture (what gets built)
- **WS1 Capture core:** NEW shared factory `packages/web-shared/leads/server/createLeadSubmitHandler.ts` (cloned from `analytics/server/createTrackHandler.ts` pattern; Property does NOT import it — additive only). Per-site 6-line `app/api/leads/submit/route.ts` wrapper, `src/lib/leads/submit-client.ts` (fallback to shared anon `submitLead()` on route failure). Semantics = Property's `api/leads/submit/route.ts` steps 1-3 ONLY: honeypot `enquiry_ref` store-flag (`extras:{honeypot:true,suspected_spam:true}`, return success), field floors (name≥2, email regex, phone≥10 digits), 24h dedupe (source,email) adopt-and-merge, extras jsonb passthrough, `probe_secret` → source='test' override. NO Twilio/verify/nurture/booking. LeadForm rewire per site (kills the live `company_url` client-side silent-drop lead-loss bug on all 6 sites). MiniCapture + CalcResultCta (template: construction-cis copies).
- **WS2 Intent layer:** port construction-cis `components/intent/*` + `lib/intent/*` (visitMemory-based, no session.ts), per-niche taxonomy, personalisation hardcoded ON (no experiment assign block), intent-aware StickyCTA site-wide.
- **WS3 Blog conversion architecture:** BlogPostRenderer parity (early tool island slot, mid InlineMiniLeadForm, bottom LeadForm, NextStepOffer), qualified-lead ExitIntentModal (Property template, drop assistant guard until WS6).
- **WS4 Premium in-blog tools + result gates:** per-niche premium fleet on Property's `lib/calculators/premium/` registry pattern + `PremiumUpgrade`/`MobileToolSlot` blog islands + `ResultGateModal` (in-blog only; escape hatch always reveals; `isConverted()` never gated; once per session). Golden tests per tool.
- **WS5 ResourceGate + resources:** Property's `components/resources/*` framework + per-niche xlsx/guides. Email delivery needs per-site Resend from-domain (owner action) — until then on-page delivery only.
- **WS6 SpecialistWidget + assistant:** Property's `SpecialistWidget.tsx` + `lib/assistant/opener.ts` + `lib/intent/journeyModel.ts`, per-niche FAQ + opener copy, email_only mode via chokepoint, `<prefix>_assistant_active` exit-intent stand-down. Strip DJH mention.
- **WS7 Experiments wind-down (once, estate):** conclude `calc_promo_inline` + `personalization` per `docs/property/EXPERIMENTS_LIFECYCLE.md` 4-step contract. 0 experiments running estate-wide; infra kept.
- **WS8 GEO parity (adjunct):** Medical keyTakeaways surface (0/73!) + backfill; Dentists backfill (42%).

## Property protection protocol (NEVER violate)
- `Property/**` READ-ONLY. No Property deploys. Never edit `Property/web/src/app/api/leads/**`, `lib/lead-routing.ts`, pg_net triggers, Property Vercel env, frozen storage prefixes (ptp/hd/dfp/ma/afl/aff/cfp/bfp).
- `packages/web-shared`: additive-only, MANAGER edits only. After ANY web-shared edit: `npm test --workspace packages/web-shared` (348) + `npm run build --workspace Property/web` + `npm test --workspace Property/web` (~961). Before deploying anything containing web-shared changes: build sweep of all 9 apps.
- Supabase migrations: additive-only, no RLS changes on `leads`; git + MIGRATIONS-list registration in same commit → staging → owner sign-off → prod (`python scripts/apply_web_analytics_migrations.py {staging|prod} <substring>`).
- Central pipeline probe before/after every deploy: `curl -s -o /dev/null -w "%{http_code}" https://www.propertytaxpartners.co.uk/api/leads/notify` → healthy = **200 on GET** (observed 2026-07-05; the route exists and responds). **404 = ALL sites' notify down → incident.**
- Synthetic leads: ALWAYS `source='test'`. Never bare `vercel deploy` from repo root (root `.vercel` = Property!). Deploys: `VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH VERCEL_PROJECT_ID=<prj> vercel deploy --prod --yes` with echo-first project ID.

## Vercel project IDs
| site | project | ID |
|---|---|---|
| generalist | holloway-davies | prj_rMK56yY2qcCPTObgwkQjVXQl8yl3 |
| Solicitors | solicitors | prj_fCtGxawB5DvMonbUtgyOJRJZUzQ9 |
| Dentists | web | prj_f3tGDR4zozATcYOSLMmCqO2ZInNV |
| Medical | medicalaccounts.co.uk | prj_50vByZ3rqXQQwCUeENUTBbNBB41n |
| contractors-ir35 | contractor-finance-partners | prj_AJhtTBB8SMdKluzfCNvwCCqU1yii |
| construction-cis | trade-tax-specialists | prj_zaehvfgdTKx0Ftc8GQVedmRnjp4g |
| digital-agency | (NO local link — relink before its wave) | — |
| Property (DO NOT DEPLOY) | property-tax-partners | prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU |

## Gate pipeline (EVERY deploy, no skips)
0. Commits on `estate-cro-parity` + tag `predeploy/<key>/<date>` + push
1. `npm test --workspace <Dir>/web`
2. `npm run build --workspace <Dir>/web` (+ full web-shared battery if touched)
3. `python scripts/predeploy_gate.py --site <key>`
4. `python scripts/spinup_site_check.py <key>` (Dentists needs `--site-dir Dentists`)
5. OWNER SIGN-OFF (diff summary + risks + rollback plan)
6. Deploy (env-override recipe above); verify returned alias = the SITE's domain
7. Post-deploy battery: AN-01 browser pass · headers check · notify-401 probe · `node scripts/estate_synthetic_lead_check.mjs --site <key>` · honeypot-filled browser submit (success UI + NO row) · once-per-site live-form probe via LEAD_PROBE_SECRET (owner pre-warned, no Reflex CC) · `python scripts/honeypot_health.py` · exercise each new surface + confirm events in web_events
8. 48h: console funnel renders, events flowing, no form_error spike
9. 7d: guardrail read vs `docs/<site>/cro_baseline_<date>.md`
Rollback: `vercel rollback --yes` (with env override) THEN `git revert` + gates before that site deploys again. Tag every deploy `deploy/<site>/<date>`.

## Progress checklist
Status vocabulary: `pending / building / built / QA'd / gated / DEPLOYED(tag) / verified-48h / verified-7d`

### Phase 0 — Baselines
- [x] State doc created (this file)
- [x] B1 orphan migrations registered — commit `d8b8d6f6` (22 files verified applied-on-prod 2026-07-05, see log)
- [x] B2 web-shared console residue — commit `f5dc9d1f` (battery green first: web-shared 348/348, Property 1076/1076 + build, console build, generalist 33/33 + build)
- [x] B3 generalist 165-file remediation set — commit `7053d489`
- [x] B4 optimisation_engine files — commit `cca3cc8e` (py_compile lint gate passed)
- [x] B5 durable docs + seranking kit — commit `69d125f0` (scratch left untracked by design)
- [x] Pushed; branch `estate-cro-parity` + tag `baseline/estate-cro-2026-07-05` created + pushed (baselines also on origin/property-onsite-assistant-mvp)
- [x] Memory index updated (`estate_cro_parity_program.md` + MEMORY.md line + delegation feedback tightened)

### Wave 1
| step | generalist | Solicitors |
|---|---|---|
| G-0 backlog release | **DEPLOYED(deploy/generalist/2026-07-05-g0) + post-deploy battery OVERALL GREEN (8/8)**; 48h soak until ~2026-07-07 17:15 BST | n/a |
| Parity matrix audit | DONE 2026-07-05 (see log — 10 uncovered gaps folded into WP scopes) | DONE 2026-07-05 |
| M1 shared chokepoint factory | **DONE — commit `7adce444`** (17-test suite; battery green: 365 web-shared + Property build + 1076; merge-guard bug caught by own tests) | — |
| WS7 experiments wind-down | **DONE — commit `82614899`** (calc_promo_inline→TREATMENT hardcoded on data 509/0/0 vs 460/2/2; construction personalization→locked ON, assign stripped; console caps updated; 0 running estate-wide; construction+console changes take effect at their next gated deploys) | — |
| R1: WS1 capture core (WP-A/WP-B) | built (Workflow wf_3d8ffb26-909) | built (incl. THE lead-loss bug fix + Wizard rewire) |
| R1: WS2 intent layer (WP-C/WP-D) | built (personalisation default-ON) | built (+ GA4 consent-gated, ConsentToggle in footer) |
| R1: WS3 blog+exit (WP-E) | built (newsletter exit modal retired) | built (+ next/image hero, dynamic [category] hub) |
| R1 Opus QA + gates + SHIP | **DEPLOYED(deploy/generalist/2026-07-05-g1)** commit `700ff921`; Opus QA SHIP, findings fixed pre-commit; probe A+B+C PASS (chokepoint proven end-to-end in prod); live-surface battery green (one agent false-alarm on chunk sampling, disproven via SSR HTML) | **DEPLOYED(deploy/solicitors/2026-07-05-s1)** commit `9a3930e9`; Opus QA SHIP, findings fixed pre-commit (fallback honeypot flag, succession category normalised ×10, em-dashes, sticky telemetry); probe A+B+C PASS; live-surface battery 7/7 GREEN (compliance fixes live: "Do not track" footer control + GA4 consent-gated; old category variant 404s correctly) |
| R2: WS4 premium tools + gates (WP-F/G/H) | pending | pending |
| R2 QA + SHIP | pending | pending |
| R3: WS5 resources (WP-I/J) | pending | pending |
| R3: WS6 widget/assistant (WP-K/L) | pending | pending |
| R3 QA + SHIP | pending | pending |
| 7d verify + go/no-go + CRO_PARITY_TEMPLATE.md | pending | pending |

### Waves 2-5 (template instantiations after wave-1 go)
Dentists → Medical (FLAT blog routing! use `scripts/medical_flat_link_audit.py`) → cfp+cis twin → agency (relink first). All pending.

## Owner authorization 2026-07-05 (evening)
"Ship R1 when the gates are green" — R1 deploy sign-off GRANTED IN ADVANCE, conditional on the full gate pipeline being green (tests, builds, predeploy_gate, spinup, Opus adversarial QA, post-deploy battery per site). The 48h G-0 soak is treated as waived by this instruction if gates go green earlier; consequence recorded: lead-recovery attribution between the G-0 honeypot rename and the R1 server chokepoint will be read as ONE combined honeypot-fix effect in the 7d/28d reads. Order still generalist first, Solicitors after generalist's synthetic probe passes.
**EXTENDED (later same evening): same standing authorization for R2 and R3 — ship when gates green, no per-release ask.** Owner also confirmed no artificial post-deploy waits: the "48h check" is a monitoring read-back, never a blocker; build phases proceed continuously.

## Gate results log
- 2026-07-05: LIVE traffic/leads baseline queried (table above). 22 unregistered migrations verified applied on prod via object-existence batch query (all true; leads_source_valid CHECK includes all 8 keys + test; sites rows for cfp/cis present).
- 2026-07-05: Phase 0 battery GREEN — web-shared 348/348, Property 1076/1076 (suite grew from ~961) + prod build, console build, generalist 33/33 + build. Baselines B1-B5 = d8b8d6f6, f5dc9d1f, 7053d489, cca3cc8e, 69d125f0; branch `estate-cro-parity` @ tag `baseline/estate-cro-2026-07-05`, pushed.
- 2026-07-05: Parity-matrix audit (generalist+Solicitors vs 71-capability standard) running via Explore agent — results land in this log.
- 2026-07-05 G-0 pre-deploy gates ALL GREEN: frontmatter blocker found by predeploy_gate (21 BOM files + 1 unquoted colon-space scalar) fixed in `37da3bb8`; gate re-run PASS (61 pricing warnings non-blocking, pre-existing); generalist tests 33/33; build pass; spinup_site_check 12/12 PASS.
- 2026-07-05 ~17:15 BST **G-0 DEPLOYED to production** (owner signed off; deployment `holloway-davies-fidissd4v`, target=production, Ready; tag `deploy/generalist/2026-07-05-g0`). Post-deploy battery via Haiku agent: **8/8 PASS** (routes 200; `enquiry_ref` live + no `company_url`; 55p live; Key-takeaways live; homepage "Small business accountants"; ingest 11 sessions/2h; honeypot_health clean; llms.txt OK). Baseline snapshot: `docs/generalist/cro_baseline_2026-07-05.md`. NOTE: Vercel CLI 54.x prints a misleading "Promote to production" JSON hint even on a real `--prod` deploy — always confirm via `vercel inspect` (target=production). CLI auth = stored login (VERCEL_TOKEN in .env is EMPTY — do not use --token).
- 2026-07-05 Parity-matrix audit COMPLETE (Explore agent, 71 caps × 2 sites). 10 gaps beyond WS1-8 folded into scopes: S consent opt-out missing while cookie policy promises it (compliance!); S GA4 mounted outside consent gate; S health-check Wizard (no honeypot, phone "—" sentinel, qualifiers crammed into message → rewire to chokepoint + extras); chokepoint hardening (rate limiter + runtime/maxDuration — DONE in M1 factory); sitemap holes (S: whole /solicitor-guides fleet + 7 static routes; G: /templates, /accountant-near-me); S hand-registered category hubs → dynamic [category] route; PF-05 env examples (S missing entirely, G drifted); S raw <img> blog hero → next/image in WP-E; SEC-04 stragglers (admin/login, og, uk-tax-rates routes); minor (OG brand literals, S stale markdown-utils fork, S conventions doc).

## Per-site quirks
- Solicitors + Medical LeadForms currently post raw PostgREST with anon key (drift) — replaced by chokepoint in their waves. Solicitors honeypot `company_url` silent-drop is THE live lead-loss bug.
- generalist: honeypot renamed locally but still client-drops until chokepoint; StickyCTA stub reinstatement is owner-approved; newsletter exit modal retired.
- Medical: FLAT `/blog/[slug]` routing — never run nested-slug link tooling.
- contractors-ir35: placeholder phone `+44 20 0000 0000` in niche.config — fix in its wave.
- digital-agency: no `.vercel` link; weakest traffic; wave 5.
- Deploy gotchas for fresh Vercel projects: framework preset must be Next.js, root dir `<site>/web`, "Include files outside root directory" ON.

## Harness lessons (for any successor agent)
1. `npm test --workspace <pkg> 2>&1 | tail` in Git Bash can MASK failures even with `set -e -o pipefail` (the npm.cmd shim). NEVER trust "=== OK ===" markers alone: always grep the output for "failed|npm error" AND for the expected pass counts before declaring a battery green.
2. **Gates bind to the FINAL tree, not to when you ran them.** S-1 shipped with a post-gate content edit (category normalisation) that changed 10 post URLs and broke 22 internal links in prod for a few hours; the R2 gate caught it. Rule: ANY edit after a gate re-runs that gate before ship. Corollary: renaming a blog category MOVES its posts' URLs — always pair with content-link sweep + a permanent redirect in next.config.

## RESUME HERE
**Current position (2026-07-05 late evening): WAVE-1 R1 FULLY SHIPPED AND VERIFIED.** G-0 (`deploy/generalist/2026-07-05-g0`), G-1 (`deploy/generalist/2026-07-05-g1`, commit `700ff921`) and S-1 (`deploy/solicitors/2026-07-05-s1`, commit `9a3930e9`) are live in production. Both sites: chokepoint probes A+B+C PASS (money path proven end-to-end incl. probe-secret→source='test' rewrite), live-surface batteries green, compliance fixes live on Solicitors. Property-harm audit CLEAN (Property/ diff vs baseline empty; web-shared changes additive-only: new leads/ module + registry status flips + continuity-test update + package.json export; Property prod 200/200; NO Property deploys occurred). LEAD_PROBE_SECRET set on both site projects + root .env.

**Next actions, in order:**
1. **48h checks for G-1/S-1** (~2026-07-07 evening): console funnels render for both sites; exposure→interaction events flowing per NEW surface (form_view/form_start via useFormTracking, exit_intent_shown, personalization_shown/clicked, cta_click sticky_cta); no form_error spike; `python scripts/honeypot_health.py` clean; leads (if any) arriving in owner inbox correctly.
2. **7d guardrail read** (~2026-07-12) vs `docs/generalist/cro_baseline_2026-07-05.md` + `docs/solicitors/cro_baseline_2026-07-05.md` (form completion not collapsed; submits unblocked; Wilson intervals if quoting rates).
3. **Phase 4 = R2 build (WS4 premium in-blog tools + result gates)** — can start immediately, ships after its own gates: Opus per-niche premium tool-set briefs (generalist: from its 7 calc libs + gaps; Solicitors: from its 6) modelled on Property's `lib/calculators/premium/` + `docs/property/tools-resources-spec.md`; Sonnet builds tools + golden tests; PremiumUpgrade/MobileToolSlot islands into BlogPostRenderer; ResultGateModal LAST (in-blog placements only; escape hatch always reveals, isConverted() never gated, once per session). Owner deploy authorization for R2/R3 NOT yet given — ask before shipping those.
4. Then Phase 5 = R3 (WS5 ResourceGate + WS6 SpecialistWidget/assistant; resource EMAIL delivery blocked on per-site Resend from-domains — owner action — on-page delivery until then).
5. Then Phase 6 = evaluate + `docs/_engines/CRO_PARITY_TEMPLATE.md` + waves 2-5 (Dentists → Medical → cfp+cis → agency).
**Open follow-ups (non-blocking):** shared-handler dedupe PATCH doesn't merge extras (wizard resubmit loses fresh health_check answers — minor, noted by QA); Solicitors partner privacy_policy_url null in config (consent copy references it); construction-cis + console WS7 changes await their next gated deploys; MiniCapture ft.onSubmit(4) hardcoded field count (cosmetic); CI still main-only (extension to estate-cro-parity offered, owner nod pending).
