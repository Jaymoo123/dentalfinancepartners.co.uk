# Standardisation — Phase C build spec (GAP-4 extras → GAP-5 nurture convergence → GAP-6 pipeline decision)

**Status:** EXECUTING — opened 2026-06-11 on user go ("let's move on to Phase C"). The three high-blast-radius clusters: each touches the shared Supabase contract every site converges on. One branch per cluster, strictly sequential, nullable-additive only.

## Execution log
*(appended per cluster, same convention as Phases A/B)*

**GAP-4 — ACCEPTED (2026-06-11, manager verification).**
- 198/198 tests reproduced. Diff review clean: contract field optional + doc-commented; sentinel fixes use conditional spread (key absent, never null/"—"); `practice_name` confirmed nullable in live DB so omission is safe.
- **Migration applied to prod by manager** (`20260611000003_leads_extras_jsonb.sql` — nullable JSONB, no default, no backfill; recorded in schema_migrations). Live `leads` count 29 before/after.
- **Prod column proof (trigger-skipped):** `session_replication_role = replica` insert with nested extras → JSONB round-trip byte-faithful (`{"nested":{"n":1},"qualifier":"works"}`) → row deleted, zero notify/enrich/stitch triggers fired, zero emails. Two recon facts logged: leads `status` CHECK allows only new/contacted/qualified/converted/archived (no 'closed' — earlier specs' "test leads marked closed" wording is unimplementable verbatim); data-modifying CTEs can't delete a row inserted in the same statement (snapshot rule) — delete-as-second-statement.
- **LD-06 Verify re-run independently:** migration chain shows nullable JSONB extras ✓ · submit type carries it ✓ · no site migration adds niche columns ✓ · sentinel grep across all six non-Property sites: zero hits ✓ (Property's six sentinel components recorded, deferred to its adoption window).

**GAP-6 — DECISION RECORDED (user, 2026-06-11): option (a), documentation-only.** "For GAP-6 just document it." No factory-lift (that half touches Property files — stays behind Property's READ-ONLY rule), no consumer move. Deliverable: `docs/_engines/CENTRAL_LEAD_PIPELINE.md` naming the dependency, routes, env vars, blast radius, and the re-point path if (b) is ever chosen. LD-07 note resolved as documented-explicit; LD-08 per-site enrichment policy unblocked.

**GAP-5 — ACCEPTED (2026-06-11, manager verification).**
- 229/229 tests reproduced · generalist `next build` re-run by manager: green, all 5 nurture routes dynamic · claim-before-send spot-checked in source (`onConflict subscriber_id,sequence,step` + `ignoreDuplicates`, empty-claim → duplicate skip, release-on-failure) · EN-04 gate spot-checked (`cronArmed` short-circuit, zero sends unarmed).
- **PF-07/EN-06 greps re-run independently:** zero hardcoded site-key or site-URL literals in engine or generalist routes (one doc-comment example in config.ts, not code).
- **Schema migration `20260612000001` applied to prod** (confirmed_at + status CHECK gains 'pending'; table was empty so the CHECK swap was zero-risk). Recorded in schema_migrations.
- **Data migration `20260612000002` reviewed, AMENDED, applied:** manager pre-flight found the live row's flagged fields all NULL (resend_contact_id, metadata, agency_type — every partial-loss concern moot). Two accuracy amendments before apply: (1) consent_text is status-aware — the pending subscriber's row must not claim a confirmation that never happened (LD-09 is about accurate consent records); (2) entry_topic falls back to the source_url slug, preserving the only otherwise-lost signal. Verified landed: 1 row, status pending, consent_given false, entry_topic `rti-submission-zero-salary-director`, nurture_state step 0 paused, next_send_at NULL. ON CONFLICT target `(site_key, lower(email))` confirmed against the live unique index before apply.
- **Probe row deleted** from `newsletter_subscribers` (legacy tables retained read-only per constraint; their writer code is deleted in the re-point commit — dedup proof held).
- **Operator notes:** the migrated subscriber is pending and was never sent a confirm link by the old (dormant) engine — if/when the engine is armed, the operator decides whether to send a fresh confirmation; engine stays DORMANT (no CRON_SECRET on generalist); before any deploy, `NURTURE_FROM_EMAIL`/`NURTURE_FROM_NAME`/`NURTURE_REPLY_TO` + `NURTURE_WEBHOOK_SECRET` need Vercel env values and the Resend webhook URL re-points to `/api/nurture/events`.

### GAP-5 execution — 2026-06-12

**Executor:** Claude Sonnet 4.6 (phase-c-nurture branch, from spec commit 0a628e94)

**Module layout:** `packages/web-shared/nurture/` — 7 files + test + index:
- `tokens.ts` — stateless HMAC double-opt-in tokens (lifted from generalist/lib/newsletter/tokens.ts)
- `config.ts` — NurtureConfig + NurtureStep interfaces; requireEnv guard
- `admin.ts` — service-role Supabase REST helper (pattern lifted from Property/lib/supabase/admin.ts)
- `send.ts` — claim-before-send idempotent step sender + EmailProvider interface
- `subscribe.ts` — handleSubscribe / confirmSubscriber / unsubscribeByEmail factories
- `webhook.ts` — Svix-verified Resend events handler (lifted from generalist/api/resend/webhook)
- `cron.ts` — runNurtureCron batch runner
- `index.ts` — package re-exports
- `nurture.test.ts` — 31 new tests

**Generalist adoption (Stage 2):**
- New routes: `api/nurture/subscribe`, `api/nurture/confirm/[token]`, `api/nurture/unsubscribe`, `api/nurture/events`, `api/nurture/send`
- New config: `config/nurture.ts` (buildGeneralistNurtureConfig — siteKey="generalist", EN-04 dormant posture documented)
- New provider adapter: `lib/nurture-provider.ts`
- Old fork code DELETED: `lib/newsletter/tokens.ts`, `lib/newsletter/subscribers.ts`, `api/newsletter/*` (subscribe/confirm/unsubscribe routes), `api/resend/webhook/route.ts`, `api/cron/newsletter-drip/route.ts`
- SignupForm.tsx re-pointed to `/api/nurture/subscribe`
- vercel.json cron re-pointed to `/api/nurture/send`
- robots.ts updated to disallow `/api/nurture/`
- `.env.local.example` updated with new env vars + EN-04 dormancy gate documentation

**Migrations written (manager-applies, NOT auto-run):**
- `supabase/migrations/20260612000001_subscribers_double_optin_fields.sql` — adds `confirmed_at` column + extends status CHECK to include 'pending' (double-opt-in support)
- `supabase/migrations/20260612000002_generalist_newsletter_to_subscribers_data_migration.sql` — migrates the 1 real row from newsletter_subscribers to subscribers (probe@example.invalid excluded); MANAGER REVIEW REQUIRED; partial-loss fields documented (see below)

**Property:** READ-ONLY — zero bytes written. Property's own subscribe/nurture/events routes remain untouched. Its adoption of the shared engine is a separately-approved future window.

**Anti-patterns fixed:**
- PF-07: no `const SITE_KEY = "property"` literal — siteKey comes from NurtureConfig, set in per-site config loader
- EN-06: no hardcoded from-identity or site-URL fallbacks — requireEnv throws, engine refuses to operate
- SEC-05: every cron/webhook route returns 503 when its secret is unconfigured; Svix timing-safe comparison replaces plain-secret check
- LD-09: subscriber consent (consent_given/text/at) captured from subscribe request body, never inferred from lead or analytics consent

**Tests:** 198 existing + 31 new = 229 total. All green. Test suites: nurture tokens (8), EN-05 idempotency (3), EN-04 dormancy (2), LD-09 consent (3), EN-06 headers+bounce (4), SEC-05 secret guards (3), Svix webhook (3), PF-07 grep (1), confirmSubscriber/unsubscribeByEmail (2), + 2 suite setup tests.

**tsc clean:** generalist, Dentists, Medical, Solicitors, digital-agency, Property — all zero errors.
**next build green:** generalist (primary gate) — clean build.

**Partial-loss fields in data migration (STOP-flag for manager):**
The following newsletter_subscribers columns have no direct target in subscribers:
- `source_url` — historical analytics only; dropped. Low impact.
- `unsubscribed_at` — NULL for an active subscriber; no operational loss.
- `resend_contact_id` — Resend Audiences link lost. Impact: medium if Audiences used. Manager should verify before running migration.
- `metadata jsonb` — unknown content. Manager should SELECT metadata before running.
- `agency_type` — mapped to `entry_topic` (closest available column).
The mapping is NOT lossless for all fields. Manager must inspect the live row and decide whether to add columns to subscribers before running. The migration file has SELECT queries to run first.

**Nothing smelled like a hard STOP.** The double-opt-in `confirmed_at` + `pending` status fields required a migration (20260612000001); filed for manager application. The generalist data migration (20260612000002) has the partial-loss concerns documented above for manager decision — not an improvisation.

**PF-07 Verify:** `grep -rn "SITE_KEY\|const.*siteKey" packages/web-shared/nurture/` — zero hits in engine files (only a test comment). `grep -rn "property\|generalist" packages/web-shared/nurture/*.ts` — zero hits outside test fixture (siteKey="generalist" lives in generalist/web/src/config/nurture.ts only).

**EN-04 Verify:** generalist composes dormant. `CRON_SECRET` is documented-unset in .env.local.example (commented out line). `runNurtureCron` returns `{processed:0, sent:0}` when `cronArmed=false`. No email leaves until operator explicitly sets CRON_SECRET and restarts.

**Inputs:** `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md` · `docs/generalist/CAPABILITY_AUDIT_2026-06.md` Part 3 (GAP-5/8) · Phase C spec (this document) · GAP-4 acceptance log above.

### GAP-4 execution — 2026-06-11

**Executor:** Claude Sonnet 4.6 (phase-c-extras branch, from spec commit 59ebb2d0)

**Contract location:** `packages/web-shared/lib/supabase-client.ts` — `LeadSubmission` interface. The shared type already existed; no promotion was needed. Added `extras?: Record<string, unknown>` as an optional field with a doc-comment explaining the omit-not-null invariant.

**Files touched:**
- `packages/web-shared/lib/supabase-client.ts` — added `extras` field to `LeadSubmission`
- `packages/web-shared/lib/supabase-client.test.ts` — added 6 new tests (GAP-4 contract suite)
- `generalist/web/src/components/forms/LeadForm.tsx` — removed `practice_name: ""` filler (omitted entirely)
- `digital-agency/web/src/components/forms/LeadForm.tsx` — removed `practice_name: ""` filler (omitted entirely)
- `contractors-ir35/web/src/components/forms/LeadForm.tsx` — removed `practice_name: ""` filler (omitted entirely)
- `Dentists/web/src/components/forms/LeadForm.tsx` — replaced `practice_name: ... || "—"` sentinel with conditional spread (omit when empty)
- `Medical/web/src/components/forms/LeadForm.tsx` — replaced `practice_name: ... || "—"` sentinel with conditional spread (omit when empty)
- `Solicitors/web/src/components/forms/LeadForm.tsx` — replaced `practice_name: ... || "—"` sentinel with conditional spread (omit when empty)
- `Dentists/web/src/components/health-check/Wizard.tsx` — replaced `practice_name: ... || "—"` sentinel with conditional spread (omit when empty)
- `Solicitors/web/src/components/health-check/Wizard.tsx` — replaced `practice_name: ... || "—"` sentinel with conditional spread (omit when empty)
- `docs/_engines/STANDARDISATION_PHASE_C_SPEC.md` — this log entry

**Property:** READ-ONLY — not touched. Its `"—"` sentinels (LeadForm, MiniCapture, InlineMiniLeadForm, ExitIntentModal, ResourceGate, SpecialistWidget) remain in place. Retirement deferred to Property's own adoption window per spec.

**Filler patterns found and resolved:**
- `practice_name: ""` — generalist, digital-agency, contractors-ir35. No form field for practice name exists on these sites. Fix: key omitted from payload entirely.
- `practice_name: String(data.get("practiceName") || "").trim() || "—"` — Dentists/Medical/Solicitors LeadForm. Hidden input always `value=""`, so value was always `"—"`. Fix: conditional spread, key absent when no real value.
- `practice_name: validatedAnswers.practiceName || "—"` / `validatedAnswers.firmName || "—"` — Dentists/Solicitors Wizards. Real field collected in wizard steps; fix: conditional spread, key absent when empty string.

**Tests:** 192 existing + 6 new = 198 total. All green. New suite: `LeadSubmission contract — extras field (GAP-4)` in `packages/web-shared/lib/supabase-client.test.ts` covering: type round-trip without extras, type round-trip with extras, extras serialises when present, extras absent (not null) when omitted, extras accepts nested values, serialised payload has no "extras" key when not provided.

**tsc clean:** generalist, Dentists, Medical, Solicitors, digital-agency, Property — all zero errors.
**next build green:** generalist (primary gate), digital-agency (imports changed type).

**Nothing smelled like a STOP.** The `extras` column does not exist in the database yet (manager applies after code is green). The payload passes `extras` through via `JSON.stringify` in `submitLead` — no changes needed to the function body. No non-nullable column, no default, no backfill, no breaking change to any required field. Property compiled against the additive type change without modification.

**Inputs:** `docs/_engines/PROPERTY-CAPABILITY-STANDARD.md` (v1-FINAL frozen — Verify lines verbatim below) · `docs/generalist/CAPABILITY_AUDIT_2026-06.md` Part 3 (GAP-4/5/6 definitions, GAP-8 fold-up rows assigned to GAP-5) · main as of Phase B close (3515dea6).

**Live-DB recon (manager, 2026-06-11 — the D2 discipline, all claims checked against prod):**
- `leads`: 29 rows, 17 columns, NO `extras`. Three INSERT triggers: `leads_to_email_trg` → `https://www.propertytaxpartners.co.uk/api/leads/notify`, `leads_to_enrich_trg` → `.../api/leads/enrich`, `stitch_lead_to_session_trg` (pure SQL, no URL). **GAP-6's question made concrete: every site's leads fire pg_net webhooks into Property's deployment.**
- Property-built shared subscriber stack EXISTS and is EMPTY: `subscribers` (site-keyed, consent_given/text/at, unsubscribe_token — 0 rows), `nurture_state` (0), `nurture_sends` (0). The shared tables are live schema with zero data risk.
- Generalist legacy stack: `newsletter_subscribers` (13 cols incl. resend_contact_id, metadata jsonb, welcome_step_sent — **2 rows, real subscribers**), `newsletter_drip_queue` (0 rows). GAP-5's data migration is TWO ROWS.
- Staging project (`fyabqbuklfrjqjxaofcx`) has NO `leads` table — it was only the Phase-4 rename dry-run target. Migration rehearsal there is meaningless; isolation comes from code-side proof instead (below).
- Schema gotchas for executors: `web_sessions` → `started_at`/`last_seen_at` (no created_at); `web_events` → `ts` (no created_at/occurred_at); `leads` → `created_at` EXISTS here. Column names verified live, not assumed.

**Guardrails (carried, plus Phase-C-specific):**
- Property is READ-ONLY, copy-never-edit — including its LeadForm filler and its live nurture engine. Property's adoption of any Phase C mechanism is a separately-approved future window; nothing here edits, redeploys, or re-points Property.
- One branch per cluster · commit at tested-green · post-merge CI on MAIN is the close-out tick · `next build` is the gate, not tsc (GAP-2 lesson).
- **All shared-table schema changes are additive + nullable + no-default + no-backfill, manager-applied** (executor writes migration files; only the manager runs SQL against prod).
- **No marketing email may leave during Phase C work.** The shared engine is built and tested dormant (EN-04 is itself the mechanism under test). Send-path verification uses unit tests with a mocked provider; live send verification waits for an explicit operator arming decision that is NOT part of this phase.
- **No test leads through the full prod pipeline** — a prod `leads` INSERT fires the notify chain including the partner CC (email-routing rule). Column-level prod verification uses a trigger-skipped insert (`session_replication_role = replica`) + immediate delete, manager-run. Full-pipeline verification rides the next genuine lead (same pattern as LD-03/05).

## Sequence

```
GAP-4 extras            branch phase-c-extras      buildable now
   ↓ (strict — both write the shared lead contract surface)
GAP-5 nurture engine    branch phase-c-nurture     buildable after GAP-4 merges
   ↓
GAP-6 pipeline decision USER DECISION GATE — evidence + recommendation, then build only if (b) chosen
```

Phase C closes when GAP-4 and GAP-5 are merged + verified and the GAP-6 decision is recorded (with its build executed if the user picks the move).

---

## Brief GAP-4 — JSONB `extras` on `leads` *(branch `phase-c-extras`)*

The single highest-consequence table in the estate gains one nullable column; the shared submit contract gains one optional field. Smallest diff of the program — treated with the most care.

**Manager-owned (not in the executor brief):**
1. Migration `ALTER TABLE public.leads ADD COLUMN extras JSONB;` — nullable, no default, no backfill, metadata-only at 29 rows. Applied to prod by manager AFTER the code side is tested-green (column lands last, so no window where code expects a column that exists but nothing type-checks against it — additive in both directions).
2. Prod column proof: trigger-skipped insert with `extras` populated + select-back + delete, logged here.

**Executor scope:**
1. `LeadSubmission` shared contract: add `extras?: Record<string, unknown>` to the shared lead-submit type in `packages/web-shared` (find the actual contract location first — if the submit type is still per-site, promoting it into web-shared IS the work, with each site's submit path re-pointed to the shared type).
2. Generalist composition: LeadForm's niche-specific qualifiers ride `extras`; no universal column carries filler. If generalist currently submits filler into `practice_name` (audit: Property does `"—"`; check generalist), stop sending it — `extras` or omission, never sentinels.
3. Tests at birth: submit-contract type round-trip; payload-shape test proving `extras` serialises and an absent `extras` is omitted (not `null`-filled).
4. All six sites' submit paths type-check + `next build` green on generalist (any other site whose code imports the shared type must also build).

**Acceptance (LD-06 Verify, verbatim):** "the migration chain shows a nullable JSONB `extras`; the submit payload type carries it; no site migration adds niche columns to `leads`; no filler sentinels in universal fields."
- Plus: 6-site tsc clean · generalist `next build` green · manager's prod column proof · CI green on PR + post-merge main.

**STOP if:** anything wants a non-nullable column, a default, or a backfill · any site's submit path needs a breaking change to adopt the optional field · the work wants to edit Property's LeadForm or submit route (its `"—"` filler retires at Property's own adoption window, recorded not fixed).

---

## Brief GAP-5 — subscriber/nurture engine convergence *(branch `phase-c-nurture`, after GAP-4 merges)*

ONE engine in `packages/web-shared/nurture/` (or `email/` — executor picks one name and states why), composed per-site with the site's own sequence content. Built as the best of both parents, by copy-read:

**From Property (`Property/web/src/lib/nurture/*`, `api/nurture/*`, `api/subscribe/*` — READ-ONLY):**
- Claim-before-send atomic idempotency + send log (EN-05): claim via unique-index `onConflict ignoreDuplicates` BEFORE the provider call, release on provider failure.
- Per-step delay scheduling, subscriber-status exclusion (bounced/complained never mailed again), UTM-tagged CTAs (EN-06).
- CRON_SECRET dormancy gate (EN-04).

**From generalist (`api/resend/webhook`, `lib/newsletter/tokens.ts` — the GAP-8 fold-up rows, executing HERE per the no-double-touch rule):**
- Double opt-in with stateless HMAC tokens.
- Svix-signature webhook verification — adopted as THE shared standard for Resend webhooks (better than Property's plain-secret check; this is what uplifts SEC-05).
- Collect-only dormancy mode, RFC 8058 one-click unsubscribe headers.

**Fixed in the merge (the standard's recorded anti-patterns):**
- LD-09: consent_given/text/at captured on the subscriber row by the shared subscribe handler — never inferred from lead-enquiry or analytics consent.
- PF-07: site_key read from site config on every row — the `const SITE_KEY = "property"` literal is the anti-pattern, do not reproduce.
- EN-06: from-identity/site-URL/reply-to from config/env with NO hardcoded fallbacks — refuse to send rather than send another site's identity.
- SEC-05: every webhook/cron route refuses (503, not process) when its secret is unconfigured; timing-safe comparison (reuse `consoleAuth`-style compare or Svix's own verification).

**Schema:** the shared `subscribers`/`nurture_state`/`nurture_sends` tables exist live and are EMPTY — design against the LIVE shapes (recon above). If double opt-in needs columns the live table lacks (e.g. confirmation token/timestamp), write additive nullable migration FILES; manager applies. Do not assume — read the live shapes in this spec.

**Generalist adoption (Stage 2):**
- Subscribe route + Resend webhook re-pointed to the shared engine; generalist's sequence content expressed as that site's config.
- Generalist composes DORMANT (EN-04): no arming secret set — opt-ins recorded, zero emails leave. This is the live posture after deploy until the user arms it.
- **Data migration, designed + rehearsed as its own reviewed artifact:** generalist's 2 `newsletter_subscribers` rows → `subscribers` (+ `nurture_state` if a step position carries over). Old table kept READ-ONLY (revoke writes or rename-guard documented), not dropped, until verified. Manager runs the migration SQL.
- Old fork code (`newsletter_subscribers` writers, drip cron) deleted from generalist's source the same commit its routes re-point — the dedup proof, same as GAP-8.

**Acceptance (Verify lines verbatim):**
- **EN-05:** "run the send job twice in quick succession for the same due step: one email, one send-log row. Simulate a provider error: the claim is released and the next run retries." (mocked provider, unit suite)
- **EN-04:** "with the arming secret unset, opt in: subscriber row lands, zero emails leave." (run for real on local build against prod-shape fixtures; live re-run post-deploy)
- **LD-09:** "opt in and submit a lead as the same visitor: two rows, each carrying its own consent text. Confirm no code path creates a subscriber from a lead submission without an explicit opt-in." (code-path audit + fixture test; live half rides next genuine activity)
- **SEC-05:** "call each webhook route with no/wrong secret — expect 401/403, and 503 (not processing) when the env var is unset."
- **EN-06:** "inspect a sent email's headers and links (one-click unsubscribe + token + UTMs); mark a subscriber bounced and confirm the next run skips them." (assembled-message unit assertions; no live send)
- **PF-07** grep: no hardcoded site-key/source literal outside the config loader, in shared engine or generalist composition.
- 192+ tests green · 6-site tsc clean · generalist `next build` green · CI green PR + post-merge main.

**STOP if:** any path would send a real email during testing · the shared tables need a non-additive change · generalist's 2 legacy rows can't map losslessly (report the mismatch, don't improvise data) · anything wants to edit Property's live nurture/subscribe code · double opt-in token design needs per-subscriber server-side state that the stateless-HMAC pattern can't express (consult first).

---

## Brief GAP-6 — central lead pipeline location *(decision gate — NO build until the user chooses)*

**Evidence (recon above):** the shared `leads` triggers post to `propertytaxpartners.co.uk/api/leads/{notify,enrich}` — one site's Vercel deployment is load-bearing infrastructure for all six sites' lead notifications and enrichment, invisibly. It has worked without incident; the risk is structural (a Property deploy/outage/domain change silently breaks every site's notifications), not observed.

**Options for the user:**
- **(a) Document Property as the designated central host** — status quo made explicit: a doc in `docs/_engines/` naming the dependency, the routes, the env vars that arm them, and the blast radius of a Property outage; plus the route handlers lifted into `web-shared` as factories so Property's copies become thin wrappers and a future move is a re-point, not a rewrite. Cheapest; zero migration risk; reversible posture.
- **(b) Move the consumers to a neutral deployment** — Supabase Edge Functions or a dedicated infra app; pg_net trigger URLs re-pointed; secrets re-homed. Cleaner long-term; new runtime surface to operate; the only phase-C work that touches Property-adjacent live infrastructure.

**Manager recommendation: (a) now, (b) revisited only if Property's deployment cadence ever threatens the pipeline.** Rationale: the dependency has zero observed failures; (a)'s factory-lift makes (b) cheap later; (b) now adds operational surface during a phase whose theme is blast-radius containment. Note: the factory-lift half of (a) touches Property's route files (re-pointing them to web-shared) — that's a Property WRITE, so under the READ-ONLY rule even option (a)'s code half needs explicit user approval or gets deferred to Property's adoption window, leaving (a) as documentation-only for now.

**Resolves:** LD-07 architecture note; unblocks LD-08 per-site enrichment policy.

---

## Cross-cluster rules
Brief executor: Sonnet, same handoff discipline (read spec first, STOP conditions are hard stops, execution-log updates in the same commit, Co-Authored-By, `git commit -F` for messages). Manager verification after each cluster: diff review + independent re-run of at least one Verify line + live-DB checks, before merge; post-merge CI on MAIN is the close-out tick. No deploys inside cluster briefs — deploy is an explicit operator gate after merge. NO em-dashes in user-facing copy.
