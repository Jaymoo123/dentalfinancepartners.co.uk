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
- Central pipeline probe before/after every deploy: `curl -s -o /dev/null -w "%{http_code}" https://www.propertytaxpartners.co.uk/api/leads/notify` → expect **401** (404 = ALL sites' notify down → incident).
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
- [ ] B1 orphan migrations registered (22 files verified applied-on-prod 2026-07-05, see log) + apply-list reconciled
- [ ] B2 web-shared console residue committed (after full Property battery)
- [ ] B3 generalist 165-file remediation set committed
- [ ] B4 optimisation_engine files committed
- [ ] B5 durable docs committed
- [ ] Pushed; branch `estate-cro-parity` + tag `baseline/estate-cro-2026-07-05` created + pushed
- [ ] Memory index updated

### Wave 1
| step | generalist | Solicitors |
|---|---|---|
| G-0 backlog release | pending | n/a |
| Parity matrix audit | pending | pending |
| M1 shared chokepoint factory | pending (estate-level, once) | — |
| WS7 experiments wind-down | pending (estate-level, once, incl. construction-cis) | — |
| R1: WS1 capture core (WP-A/WP-B) | pending | pending |
| R1: WS2 intent layer (WP-C/WP-D) | pending | pending |
| R1: WS3 blog+exit (WP-E) | pending | pending |
| R1 Opus QA + gates + SHIP | pending | pending |
| R2: WS4 premium tools + gates (WP-F/G/H) | pending | pending |
| R2 QA + SHIP | pending | pending |
| R3: WS5 resources (WP-I/J) | pending | pending |
| R3: WS6 widget/assistant (WP-K/L) | pending | pending |
| R3 QA + SHIP | pending | pending |
| 7d verify + go/no-go + CRO_PARITY_TEMPLATE.md | pending | pending |

### Waves 2-5 (template instantiations after wave-1 go)
Dentists → Medical (FLAT blog routing! use `scripts/medical_flat_link_audit.py`) → cfp+cis twin → agency (relink first). All pending.

## Gate results log
- 2026-07-05: LIVE traffic/leads baseline queried (table above). 22 unregistered migrations verified applied on prod via object-existence batch query (all true; leads_source_valid CHECK includes all 8 keys + test; sites rows for cfp/cis present).

## Per-site quirks
- Solicitors + Medical LeadForms currently post raw PostgREST with anon key (drift) — replaced by chokepoint in their waves. Solicitors honeypot `company_url` silent-drop is THE live lead-loss bug.
- generalist: honeypot renamed locally but still client-drops until chokepoint; StickyCTA stub reinstatement is owner-approved; newsletter exit modal retired.
- Medical: FLAT `/blog/[slug]` routing — never run nested-slug link tooling.
- contractors-ir35: placeholder phone `+44 20 0000 0000` in niche.config — fix in its wave.
- digital-agency: no `.vercel` link; weakest traffic; wave 5.
- Deploy gotchas for fresh Vercel projects: framework preset must be Next.js, root dir `<site>/web`, "Include files outside root directory" ON.

## RESUME HERE
**Current position:** Phase 0 in progress. State doc just created. Next action = B1: edit `scripts/apply_web_analytics_migrations.py` to append the 22 verified-applied migrations (chronological order, commented "already applied to prod, registered retroactively 2026-07-05"), then `git add supabase/migrations/20260704000001_metric_consistency_visitor_id.sql scripts/apply_web_analytics_migrations.py docs/_engines/CRO_PARITY_PROGRAM.md` and commit as `cro-parity: B1 register 22 applied-but-unlisted migrations + program state doc`. Then B2 (run full Property battery first: web-shared 348 tests, Property build, Property ~961 tests, console build; then commit `packages/web-shared/console/adminData.ts` + `console/components/VisitorsTable.tsx`). Then B3 (generalist 165 files; gate = generalist tests+build). Then B4 (optimisation_engine 5 modified files, flake8 E9,F63,F7,F82). Then B5 (durable docs: `docs/console/METRIC_CONSISTENCY_AND_LOAD.md`, `docs/property/LEAD_NURTURE_AUDIT_FIX_KICKOFF.md`, `docs/property/REDESIGN_ARCHITECTURE.md`; leave scratch untracked). Then push, branch `estate-cro-parity`, tag, push. Then Phase 1 (G-0) — full gate pipeline above, OWNER SIGN-OFF before the deploy step.
