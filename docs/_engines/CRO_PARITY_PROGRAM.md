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
| digital-agency | agency-founder-finance (RELINKED 2026-07-06) | prj_roTeeTjzABAR7D649dTkq2ta4rQi |
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
| R2: WS4 premium tools + gates (WP-F/G/H) | built (6 tools, 23 goldens; Workflow wf_c4bec3b5-51a) | built (4 tools + CGT/BADR lib + 2 factual lib fixes; 131 tests) |
| R2 QA + SHIP | **DEPLOYED(deploy/generalist/2026-07-06-g2)** commit `8f267ac9`; Opus QA SHIP, findings fixed pre-commit (blog chart render, dead import); probes A+B+C PASS | **DEPLOYED(deploy/solicitors/2026-07-06-s2)** same commit; QA SHIP, findings fixed (gate topic threaded as prop, test em-dashes); probes PASS; S-1 category-fallout repaired (22 links + 301s, old path 308→200 verified); factual fixes LIVE (2026/27 dividend rates, GBP 250 figure gone) |
| R3: WS5 resources (WP-I/J) | built (6 gated Excel+guide pairs, on-page delivery) | built (4 pairs; generator run at integration; registry enabled + resourceId wired) |
| R3: WS6 widget/assistant (WP-K/L) | built (widget + FAQ + deterministic assistant + stand-down; 216 tests) | built (15-QA FAQ, SRA facts locked; 158 tests) |
| R3 QA + SHIP | **DEPLOYED(deploy/generalist/2026-07-06-g3)** commit `43d27e30`; QA HOLD findings all closed pre-ship (YAML-date build breaker, 148 xlsx em-dashes + regeneration, extractHeadings, colon-title, call-site prop); probes PASS; resource pages + workbooks 200 | **DEPLOYED(deploy/solicitors/2026-07-06-s3)** same commit; QA SHIP (+NIC-ripple preview fix 74,979→77,607 with drift golden); probes PASS; migration 20260706000001 LIVE on prod (owner-signed) |
| 7d verify + go/no-go + CRO_PARITY_TEMPLATE.md | **WAVE 1 CLOSED 2026-07-06 — full Property parity live on both sites.** 7d reads ~2026-07-12; template doc in draft (Opus agent) | same |

### Waves 2-5 (template instantiations; full-estate rollout owner-authorized)
Audits committed: `docs/_engines/WAVE2_3_PARITY_AUDIT.md` + `WAVE4_5_PARITY_AUDIT.md`. Template committed: `CRO_PARITY_TEMPLATE.md` (`820b3d88`).
**Wave 2 Dentists R1 = DEPLOYED(deploy/dentists/2026-07-06-d1)** commit `9c9d852d`: chokepoint + honeypot kill (LeadForm + Wizard), NIC 13.8%/9,100→15%/5,000 + dividends 2026/27 with regenerated/pinned goldens + delta table, intent layer (7 topics × 12 category slugs), dynamic [category] hub (83 posts' 404 breadcrumbs FIXED — verified live, /blog/nhs-pension 200), ConsentToggle, wizard extras.health_check. Opus QA HOLD findings closed pre-ship (StickyCTA double-mount blocker, shared one-modal-per-session cap + fire-time consent, empty [slug] dir, em-dashes). Probes A+B+C PASS; enquiry_ref live, company_url gone. 152/152 tests. **Backport follow-up: wave-1 sites lack the shared modal-session cap (gen/sol DeepScroll vs ExitIntent can both fire) — apply at next wave-1 touch.**
**Dentists R2 = DEPLOYED(deploy/dentists/2026-07-06-d2)** commit `dfc01b11`: 5 premium tools on corrected libs, 46 conservation-checked goldens, QA SHIP (findings closed: NaN coalesces, dash, display wired to exported lib constants); probe PASS; premium island verified in live NHS-pension post SSR HTML. **Medical R1 = DEPLOYED(deploy/medical/2026-07-06-m1)** commit `335c4be9`: worst-in-estate LeadForm replaced, wizard honeypot added (was bot-open), GA4 consent-gated (verified live: no googletagmanager in raw HTML), flat-routing topic-as-prop, WS8 surface, 46 pre-existing BOMs stripped (G-0 defect class), QA blocker fixed (/for-gps route form). Probe PASS. Baseline: docs/medical/cro_baseline_2026-07-06.md (5 leads/30d, ~3.7% GB conversion via /contact alone - the estate's quiet overperformer). **IN FLIGHT: Dentists R3 build (Workflow wf_24e729aa-45f; brief `d67da830`; --primary token invariant is a BLOCKING QA check) ∥ Medical R1 build (Workflow wf_fa2453c9-e89; flat-routing divergences encoded: topic-as-prop for blog posts, NO dynamic [category], GA4 into ConsentedScripts, LeadForm full replacement, keyTakeaways surface added).** Owner authorization: "ship D2 and D3 when green then start medical" **EXTENDED 2026-07-06: "ship D3 and Medical when green then do the twins" — wave-4 twin build (cfp+cis per the WAVE4_5 audit split) launches straight after Medical R1 lands; all ship-when-green.** — all covered by standing ship-when-green; Medical BUILD started early in parallel (disjoint trees), its deploys queue behind Dentists'. Dentists R3 brief committed and ready (R2-before-R3 dependency respected). Then: cfp+cis twin → agency (AMBER: relink, house_positions, newsletter retirement first).
If resuming cold: check `/workflows` or relaunch via the script paths in the workflow scripts dir; QA triage → integration battery (tests+BUILD+gate+spinup, error-scan discipline) → ship per the gate pipeline → tag → baseline snapshot before each site's first CRO deploy (Medical needs one BEFORE its R1 ships: docs/medical/cro_baseline_<date>.md via the Sonnet snapshot pattern).

## Owner authorization 2026-07-05 (evening)
"Ship R1 when the gates are green" — R1 deploy sign-off GRANTED IN ADVANCE, conditional on the full gate pipeline being green (tests, builds, predeploy_gate, spinup, Opus adversarial QA, post-deploy battery per site). The 48h G-0 soak is treated as waived by this instruction if gates go green earlier; consequence recorded: lead-recovery attribution between the G-0 honeypot rename and the R1 server chokepoint will be read as ONE combined honeypot-fix effect in the 7d/28d reads. Order still generalist first, Solicitors after generalist's synthetic probe passes.
**EXTENDED (later same evening): same standing authorization for R2 and R3 — ship when gates green, no per-release ask.** Owner also confirmed no artificial post-deploy waits: the "48h check" is a monitoring read-back, never a blocker; build phases proceed continuously.
**EXTENDED 2026-07-06: "when R3 is done start waves 2-5"** — full-estate rollout authorized as template instantiations (Dentists → Medical → cfp+cis twin → agency), ship-when-green per release. Prod DB migrations remain individually owner-signed (classifier-enforced, correctly). Wave order re-validated with live traffic query at each wave gate.

**WAVE 2 CLOSED 2026-07-06: Dentists at FULL PARITY** (D-1 `9c9d852d`, D-2 `dfc01b11`, D-3 `92615fa6`; tags deploy/dentists/2026-07-06-d{1,2,3}; all probes PASS; resources+workbooks live; 372 tests). D-3 QA caught a would-be-total-outage (ResourceGate missing captureMode email_only = 400 on every download) + 57 pre-existing undefined var(--primary) usages swept. **Medical R1 + R2 LIVE (M-1, M-2 `c8810d1c` tag deploy/medical/2026-07-06-m2; Class 4 fix live; island verified in real post SSR after a silent-deploy-failure catch). R3 brief designing.** Twin wave (cfp+cis) R1 launching. Placeholder-phone posture: display removed where config phone is the 0000 placeholder (form-first per estate rule); owner to supply real numbers if wanted.

**Owner 2026-07-06 (late): "ship the twins when green then finish medical" — twins R1 (wf_2f16225c-a51) ships on green; Medical R2 (wf_6ae5c288-742) then R3 complete wave 3. Standing ship-when-green covers all.**

**AGENCY PREP STARTED 2026-07-06 (owner: "then start agency prep"):** (1) Vercel RELINKED (digital-agency/web/.vercel -> agency-founder-finance, prj_roTeeTjzABAR7D649dTkq2ta4rQi) - the audit's worst-case deploy-provenance risk is CLOSED; (2) house_positions.md authoring in flight (Opus); (3) newsletter retirement = locked round-2 decision, cron disarm ships with the wave; (4) baseline snapshot in flight (incl. health_check_submissions + subscriber counts).

**WAVE 4 R1 SHIPPED 2026-07-07: both twins live** (commit `8c2d5063`; tags deploy/construction-cis/2026-07-07-c1 + deploy/contractors-ir35/2026-07-07-f1; probes PASS both; verified live: enquiry_ref + no company_url both contacts, embeds un-framing-denied both, cis robots AI-allowlist, WS7 personalization lock now LIVE on cis). cfp gained the full intent layer + real StickyCTA. QA findings closed pre-ship (shared cfp_modal_shown caps + fire-time consent). ESTATE STATE: the company_url lead-loss bug is now DEAD ON ALL 6 NON-PROPERTY SITES. Remaining: twins R2/R3 (briefs to follow), Medical R3 (building), agency R1 (building; house_positions locked; relink done).

**TWINS R2 SHIPPED 2026-07-06 morning: both premium fleets LIVE** (tree `255a68a8` deployed at HEAD `a5b2be81`; tags deploy/construction-cis/2026-07-06-c2 `dpl_BA9CKhhRCwmohCTXAm4GXD7mcrRD` + deploy/contractors-ir35/2026-07-06-f2 `dpl_D1p9nDNcv5bQS7zGkuWUsR3BiDm5`; both READY/target=production, correct aliases). Battery: probes A+B+C PASS both sites; SSR new-content markers verified live both (cis /blog/cis-refunds/cis-back-years-refund-guide + cfp /blog/ir35-status/challenge-ir35-determination-sds each show "interactive tool" ×2 + animate-pulse + PremiumUpgrade chunk). GPS £100k-cap defect-#6 fix is in this release. DATE NOTE: the R1 tags dated 2026-07-07 were misdated (+1 day) by the prior session — actually created 2026-07-05 ~23:05 +0100; R2 tags use the true date, so c2/f2 correctly come AFTER c1/f1 despite the earlier-looking date.

**WAVE 3 CLOSED 2026-07-07 (tag-date caveat above; actually 2026-07-05 late): Medical at FULL PARITY** (M-1 `335c4be9`, M-2 `c8810d1c`, M-3 `a28b11c8`; tags deploy/medical/2026-07-0[67]-m{1,2,3}; probes PASS; resources+workbooks live; suite 19 -> 330 tests through the wave). Sites at full parity: generalist, Solicitors, Dentists, Medical (4 of 7). Remaining: twins R2/R3 (briefs designing), agency R1 (building) then R2/R3.

## Gate results log
- 2026-07-06: THIRD live factual defect fixed (commit `ddb7a24c`): Solicitors take-home employer NIC secondary threshold 9,100→5,000 (stale since Apr 2025; understated NIC ≤ £615/yr on every Ltd output). Survived because Ltd tests asserted typeof-only — REAL pinned goldens added (conservation-checked, 132/132). TOOLS.md also corrected (£250 SRA line + 2025/26 dividend rates). Running tally of live advisory-grade defects caught by program fact-tracing: 3 (dividend rates, SRA £250, NIC threshold).
- 2026-07-06: migration `20260706000001_resource_gate_notify_skip.sql` written+registered+committed (`16eddc86`); staging apply N/A (trigger fns exist only on prod — created via Management API with secrets); prod-readiness verified by introspection.
- 2026-07-06: **migration APPLIED TO PROD with explicit owner sign-off** (AskUserQuestion; the auto-mode classifier correctly required specific authorization beyond the general ship directive). Both triggers verified carrying the WHEN clause; post-migration probe A+B+C PASS (normal lead flow unaffected). R3 ship gate = fully cleared; owner authorization "ship R3 when green" recorded.
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
2. **Curl-battery agents false-alarm on client-rendered surfaces (twice now).** ssr:false dynamic imports live in lazy chunks NOT referenced by the initial HTML, and some calculator pages SSR zero config text. Battery rules going forward: chunk-grep misses are INCONCLUSIVE not FAIL; prefer SSR-visible markers; when a surface is client-only, evidence = source at the deployed commit + green goldens + deploy provenance. R2 verification closed on exactly that basis (all 3 flags disproven; events flowing 40/7 per hour gen/sol post-deploy).
3. **Never pipe `vercel deploy` output straight into a URL grep.** The M-2 first attempt failed silently inside `| grep -oE <url> | head -1` (empty output, no error surfaced, "DONE" echo printed anyway); the island-marker check then failed against prod and the deployment field was empty. Deploys run foreground-or-full-log with the URL extracted afterwards, and post-deploy verification MUST include a NEW-content marker check against a real page (a probe passing only proves the previous deploy's routes).
4. **Gates bind to the FINAL tree, not to when you ran them.** S-1 shipped with a post-gate content edit (category normalisation) that changed 10 post URLs and broke 22 internal links in prod for a few hours; the R2 gate caught it. Rule: ANY edit after a gate re-runs that gate before ship. Corollary: renaming a blog category MOVES its posts' URLs — always pair with content-link sweep + a permanent redirect in next.config.

## RESUME HERE (handoff written 2026-07-06 end-of-day; owner: "pick it back up tomorrow and finish off")

**You are finishing the estate CRO parity program. Everything below is committed on `estate-cro-parity` (pushed). Standing owner authorization: ship-when-green for ALL remaining releases; prod DB migrations individually owner-signed (none pending). Read the Gate pipeline + Property protection + Harness lessons sections above before acting.**

### State snapshot
- LIVE AT FULL PARITY (4): generalist, Solicitors, Dentists, Medical (waves 1-3 closed; all tags deploy/<site>/...).
- Twins R1 LIVE (C-1/F-1, tags 2026-07-07-c1/f1): lead-loss bug dead on ALL 6 non-Property sites.
- Program defect tally: 6 live advisory-grade tax defects fixed (dividends, SRA 250, NIC 9100, Class4 9%, R&D 40%/27%, GPS cap) + 2 QA-caught would-be outages (YAML dates, ResourceGate captureMode) + wizard silent-discard class killed 3 times.

### DO IN ORDER
1. ~~SHIP twins R2 (C-2/F-2)~~ **DONE 2026-07-06 (see TWINS R2 SHIPPED above)** - commit `255a68a8`, ALL GATES ALREADY GREEN (cis 108/108 + build + gate PASS incl. the GPS defect-#6 fix live in fleet+premium; cfp 111/111 + build + gate PASS). Steps: deploy cis (prj_zaehvfgdTKx0Ftc8GQVedmRnjp4g) then cfp (prj_AJhtTBB8SMdKluzfCNvwCCqU1yii) per the env-override recipe (FULL-LOG capture, never grep-pipe the deploy); vercel inspect target=production; `node scripts/estate_synthetic_lead_check.mjs --site <key> --route` both; new-content marker = "interactive tool|animate-pulse" in a mapped blog post SSR HTML per site; tag deploy/<site>/<date>-{c2,f2}; state-doc line.
2. **UNBLOCK + SHIP agency A-1** - commit `c2783699`, tests 173/173 + build green; predeploy_gate FAILS ONLY on tooling: `scripts/frontmatter_lint.py --check --site agency` prints "No files" (no site->dir mapping for agency = digital-agency/web/content) and the internal-link auditor output "could not parse" (same mapping gap). FIX: add the agency mapping to frontmatter_lint.py (and the link auditor it shells, see check_frontmatter()/link section in scripts/predeploy_gate.py) - content YAML is ALREADY verified valid by direct parse and 298 BOMs stripped. Re-gate -> PASS expected -> set LEAD_PROBE_SECRET on prj_roTeeTjzABAR7D649dTkq2ta4rQi (value in root .env), deploy, inspect, probe --route, verify newsletter GONE from live homepage/footer + wizard leads landing (submit test via probe), tag deploy/digital-agency/<date>-a1.
3. **Twins R3 build+ship (C-3/F-3)** - briefs committed `41207b95` (docs/{construction-cis,contractors-ir35}/R3_RESOURCES_ASSISTANT_BRIEF.md); the cis-tax.ts dependency they gate on IS now in the tree. Run a Workflow per the R3 pattern (see the Medical R3 workflow script under the session workflows dir, or clone its shape: resources worker -> widget worker -> Opus QA), then integrate (tests+BUILD+gate), ship both, tag. Remember: captureMode "email_only" AS A FIELD on gates+widgets; workbooks generated + binary-verified em-dash-free; LET-free formulas.
4. **Agency R2 + R3** - briefs NOT yet written: design each with an Opus agent per the template (R2: premium tools on agency's 8 config libs incl. the CORRECTED rd-tax-credit; reconcile the 12 bespoke calculator components question per WAVE4_5 audit. R3: resources+widget per docs/agency/house_positions.md; respect its section-8 UAE OPEN-ITEM hedges). Build via Workflow, QA, ship A-2/A-3. WAVE 5 CLOSES.
5. **PROGRAM CLOSE-OUT**: (a) fresh live traffic/leads read (the SQL patterns in Live ground truth section) vs all 7 committed baselines; (b) Property-harm audit: `git diff baseline/estate-cro-2026-07-05..HEAD -- Property/` MUST be empty + web-shared diff review + Property tests; (c) 7d guardrail read dates per site (wave1 ~07-12, dentists ~07-13, medical ~07-13/14, twins ~07-14, agency +7d from A-1); (d) finalise this doc + memory (estate_cro_parity_program.md) as COMPLETE; (e) owner-actions list to deliver: Resend from-domains per site (unlocks emailed resources), real phone numbers for the twins (or keep form-first), CI push-trigger extension to estate-cro-parity (offered, never approved), /newsletter page final disposition (delinked but live), Dentists keyTakeaways backfill 42% + Medical 0/73 via content engines (WS8 content passes), wave-1 modal-cap backport (gen/sol DeepScroll vs ExitIntent shared cap - Dentists pattern) at next wave-1 touch, prod<->origin/main reconciliation (out of program scope, offer separately).

### Watchouts (in addition to Harness lessons above)
- cwd drifts: several incidents this session from persisted `cd` - always `cd /c/Users/user/Documents/Accounting` or absolute paths.
- The npm test/deploy output-masking + curl-battery false-alarm + gates-bind-to-final-tree lessons are ALL REAL and all bit us; follow them literally.
- Workers occasionally soft-pedal manager rulings (GPS fleet fix) or revive killed patterns (wizard phone sentinel): verify rulings landed by reading the diff, not the summary.
