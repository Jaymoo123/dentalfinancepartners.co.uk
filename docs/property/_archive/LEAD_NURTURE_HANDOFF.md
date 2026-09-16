# Lead Nurture System — Handoff / "Where we are"

*Handoff written 2026-07-01. Read this first, then `docs/property/LEAD_NURTURE_SYSTEM.md` (the full runbook). This file = current state + the next actions to make it live.*

---

## SESSION 3 KICK-OFF (2026-07-01, written by Fable for the next Fable) — READ THIS FIRST

### Operating model (owner directive, given explicitly this session)
- **Fable is the ARCHITECT, not the builder.** Plan, decide, review, integrate, gate. Keep context lean: read handoffs and contracts, not whole files; no long build loops in the main context.
- **Delegate execution to sub-agents**: Opus for adversarial review / judging / hard briefs; Sonnet for well-scoped build slices (a component, a route, a test file) with a precise contract each; Haiku for mechanical grunt only (never content, never judgment). Existing tiering rule [[feedback_no_deepseek_opus_only]] still applies.
- **Design sign-off BEFORE touching user-facing surfaces.** This session's lesson: Fable started editing LeadForm's message box without agreeing the design; the owner interrupted; the partial edits were fully reverted (tree verified green afterwards: Property 163/163, tsc clean). Present options, agree, then deploy builders.
- Everything remains local-first, uncommitted, dormant. Prod actions (migration, deploy, Vercel env) need explicit sign-off.

### SESSION 4 (2026-07-02): psychology/UX/AI programme BUILT on top of the dormant system
The owner asked "are we doing everything?" (psychology, UX, monetisation, AI advantage). Full design + build executed same-session: 7-touch evidence-based sequence with a T0 branded-vs-plain-personal experiment, quiet hours + best-send-hour, echoes of the lead's own answers, AI per-lead copy generation behind a deterministic QA gate, booked-slot reminders + .ics, abandoned-booking nudge, engagement-reactive variants, inbound-email replies now count, bounded SMS booking concierge (closed template set, 74-test adversarial suite), DJH call brief, returning-lead on-site booking nudges + assistant booking mode, endowed-progress thank-you rail, opt-out route + List-Unsubscribe. Everything dormant behind flags; two ARMING gates: privacy notice naming Anthropic (for `LEAD_COPY_AI_ENABLED`) and owner review of a live red-team run (for `LEAD_CONCIERGE_ENABLED`). Full spec: `.claude/plans/okay-i-mean-for-async-wirth.md`; capability summary + env: `docs/property/LEAD_NURTURE_SYSTEM.md` "Psychology/UX/AI programme" section. Gates at close: Property 619/619, web-shared 326/326, tsc clean, next build green, staging re-verified.

### Workstreams, in owner priority order

**W1. Live dress rehearsal — DONE 2026-07-01 (staging ready + full flow smoke-tested).**
- Schema sync: `scripts/staging_schema_sync.py` (NEW, reusable) introspects PROD directly (read-only) and applies exact DDL to staging for the runtime object set in `scripts/staging_schema_objects.json` (8 tables incl. FK-pulled `sites`, `vw_visitor_journey`, `ingest_web_events`, stitch trigger). Webhook triggers (`leads_to_email`, `leads_to_enrich`) are deliberately NOT copied, so staging submits never email DJH or hit prod endpoints. Column parity verified 8/8 tables; `sites` seeded (8 rows). Chose introspection over migration replay because `000_create_core_tables.sql` has invalid syntax (`ADD CONSTRAINT IF NOT EXISTS`) and prod's base schema predates version control.
- Nurture migration applied to staging via `python scripts/apply_web_analytics_migrations.py staging 20260701000001` (file added to that script's MIGRATIONS list; prod apply later uses the same command with `prod`).
- `Property/web/.env.local`: staging Supabase pointers added UNCOMMENTED (local dev now points at staging by default; this file previously had NO Supabase config, so nothing was overridden and the "dev writes to prod" gap is closed). Arm flags in the same block stay COMMENTED; owner uncomments `LEAD_NURTURE_ENABLED` + `LEAD_NURTURE_EMAIL_ENABLED` to rehearse.
- Smoke-tested end to end on `npx next dev` + staging: `lead_nurture_probe.mjs` PASS (submit -> real Twilio Lookup verify -> enrol -> cleanup), plus the booking leg: submit returned `bookingToken`, `/book?t=...` rendered, `POST /api/leads/book` returned the human slot label, staging showed `verify_pass` + `booked` events and nurture state active step 1; all probe rows cleaned.
- Gotcha for future sessions: Management API calls MUST send a custom `User-Agent` (e.g. `accounting-network-migrator/1.0`); the default Python/urllib UA is blocked by Cloudflare with `error code: 1010` masquerading as HTTP 403.
- Rehearsal = owner runs `cd Property/web && npx next dev` (optionally with the arm flags uncommented), submits the form, follows thank-you -> slot picker -> /book, then inspects staging rows or the funnel view.

**W2. Guided enquiry composer — BUILT 2026-07-01, gates green (local, uncommitted).**
Delivered per the signed-off design: `Property/web/src/lib/leads/enquiry-message.ts` (pure compose+validate helper, exported error copy) + LeadForm's message textarea replaced by the three required prompts with a live encouragement hint keyed to `SITUATION_MIN_CHARS`. Tests `src/tests/enquiry-message.test.ts` (17, incl. dash-hygiene + server-minimum guards). Gates: Property vitest 180/180, tsc clean, no em/en dashes in changed files. Built by 2 parallel Sonnet agents to pinned contracts; architect reviewed the diff and made one cleanup (hint thresholds now use SITUATION_MIN_CHARS, not literal 40).
Owner chose: three labelled prompts, ALL THREE REQUIRED (owner overrode the optional-follow-ups recommendation). Fields: "Your situation" (textarea, min 40 trimmed chars, live encouragement hint), "What's prompted this now?" and "What do you want from the call?" (one-line inputs, min 3 trimmed chars). Assembled client-side by `Property/web/src/lib/leads/enquiry-message.ts` into one `message` string ("Situation: ...\n\nPrompted by: ...\n\nWants from call: ...") so the server chokepoint, DB schema and dossier scoring are untouched. MiniCapture untouched (calc-engagement watch to ~mid-July). Watch the form-completion guardrail after ship: 4 required message fields is deliberately stricter. Delegated: one Sonnet agent for helper+LeadForm, one for tests; architect reviews + runs gates.
Original brief (for reference):
Evidence: lead 2026-07-01 19:50 (Annie W.) = 99-char one-sentence message; the current LeadForm minimum is 10 chars. Same lead's phone `00353833...` is a REAL Irish mobile in 00-format (toE164UK handles it; Lookup will verify once live) — the number was fine, the thin message was the problem. Counter-example: lead 2026-06-30 (382 chars, Form 17/DoT specifics) shows the form can produce quality.
Owner's requirement: elicit what the problem is, why they think it is a problem, and what they want from the call — while limiting the headache. The traditional form STAYS (owner asked and this was confirmed): name/email/phone/consent/server chokepoint unchanged; only the message capture evolves.
Sketch to present (not yet agreed): replace the single message textarea with three labelled prompts — "What's your situation?" (main box, real minimum ~40 chars, live encouragement hint), "What's prompted this now?" (one line), "What do you want from the call?" (one line) — assembled server-bound into `message` as labelled sections (reads perfectly in the DJH dossier; dossier already scores message length). Alternatives worth offering: single box with live coaching checklist; or a 2-step form (contact -> detail). MiniCapture: LEAVE ALONE for now (result-gate calc-engagement watch runs to ~mid-July; changing it would confound).
Delegation shape once agreed: one Sonnet agent for the LeadForm change + one for tests; Fable reviews the diff + runs the gates.

**W3. Twilio number (owner action, in flight).** UK number registration pending on Twilio. When it lands: set `TWILIO_SMS_FROM` in `Property/web/.env.local`, configure the number's inbound Messaging webhook to `…/api/leads/inbound/twilio`. Account SID + Auth Token + SK API-key pair are already in `.env.local` and were VERIFIED live against the Twilio API this session. `LEAD_NURTURE_TOKEN_SECRET` generated.

**W4. Go-live (after W1-W3):** mirror env to Vercel -> prod migration (sign-off) -> deploy DORMANT -> `node scripts/lead_nurture_probe.mjs` -> flip `LEAD_NURTURE_ENABLED` + email/SMS flags -> watch the funnel vs the 3/9 baseline.

### Suggested owner kick-off prompt for the fresh session
"Read docs/property/LEAD_NURTURE_HANDOFF.md, SESSION 3 section. Operate as architect per the operating model. Start with W1 (staging rehearsal) / W2 (present me the composer design options before building anything)."

---

## One-paragraph status
The Property lead **contactability & nurture system** is fully BUILT and HARDENED (an adversarial review found 8 issues, all fixed + regression-tested). It runs a verify → nurture → contactability-gate pipeline on our side so only verified + genuinely responsive leads reach DJH (fixes DJH's "only 3 of 9 contactable"). It is **NOT committed, NOT deployed, and ships DORMANT** (no message reaches anyone until `LEAD_NURTURE_ENABLED` + per-channel flags are set). All tests green: **web-shared, Property 150/150, both apps tsc clean.** Branch: `property-onsite-assistant-mvp` (uncommitted). Owner has chosen **email + SMS + Cal.com booking** for v1 (WhatsApp deferred; coded but off).

## Lead-quality pass (2026-07-01, Fable session) — done on top of the above
- **Readiness dossier** (`lib/leads/dossier.ts`): the "READY FOR DJH" handoff email is now an evidence pack: explainable Grade A/B/C (0-10, per-point reasons), verbatim reply transcript with timestamps, response latency, best-call-window (London time, from when they actually respond), pages read + calculator usage, device/country. Also FIXED a silent bug: the old handoff queried `vw_visitor_journey` columns that do not exist (`sessions,engaged_ms`; real columns are `total_sessions,total_engaged_ms`), so the journey line never rendered.
- **Reply auto-ack** (`lib/leads/reply-ack.ts`): first genuine SMS/WhatsApp reply gets ONE service-only acknowledgement asking for best call time + rough portfolio size (answers land verbatim in the dossier). Idempotent (`ack_sent` event), dormancy-gated through the same ChannelSender. Post-handoff replies email the operator a short "Lead update" (capped 3/lead, `operator_update` events). Migration CHECK extended with both event types (file was unapplied, edit-in-place safe).
- **Twilio API-key auth** (`channels.twilioAuth()`): outbound send + Lookup now accept `TWILIO_API_KEY_SID`/`TWILIO_API_KEY_SECRET` (SK pair) alongside the `AC…` Account SID; a clear console error fires if an `SK…` value is put in `TWILIO_ACCOUNT_SID`. Inbound signature validation still requires `TWILIO_AUTH_TOKEN`.
- **Env**: the owner's pasted SK key pair was found freeform at the bottom of the repo-root `.env` (unusable there); moved into `Property/web/.env.local` as `TWILIO_API_KEY_SID`/`TWILIO_API_KEY_SECRET` with a checklist comment.
- **Native booking replaced Cal.com** (owner decision, same session): nobody on our side attends a calendar, so booking is our own `/book` page (signed `book`-intent lead token): next 10 weekdays x 3 call windows -> `POST /api/leads/book` -> `booked` event with human slot label -> same gate -> slot in the DJH dossier. Thank-you page embeds the picker inline via a `bt` token from the submit response; every nurture message links `/book?t=...`. Cal.com webhook route DELETED; `LEAD_BOOKING_URL`/`NEXT_PUBLIC_LEAD_BOOKING_URL`/`CAL_WEBHOOK_SECRET` retired. Files: `lib/leads/booking.ts` (pure, tested), `api/leads/book/route.ts`, `components/forms/BookingPicker.tsx`, `app/book/page.tsx`.
- **Twilio provisioned + VERIFIED 2026-07-01**: owner added `AC…` Account SID + Auth Token to `.env.local`; both auth shapes probed live against the Twilio API (account active). `LEAD_NURTURE_TOKEN_SECRET` generated. **Only `TWILIO_SMS_FROM` remains: buy a UK mobile number** (Console > Buy a Number > UK > Mobile, SMS-enabled) and set its inbound webhook.
- Tests: Property suite 163/163 green (dossier + ack + booking), web-shared green, tsc clean, `next build` green (`/book` + `/api/leads/book` routes present).

## Locked decisions / constraints (do not relitigate)
- **Service-only under the existing LIA**: every automated message is a solicited, non-promotional follow-up about the enquirer's own enquiry. No marketing drip, no new consent checkbox. Ties to the executed Lead-Gen & Data-Sharing Agreement.
- **Strict gate**: forward only leads that pass verification AND actively respond (reply / book / confirm).
- **No hosted DeepSeek** (GDPR). Deterministic v1; any future conversational layer is Claude Haiku. Model tiering: Opus plans/judges, Sonnet/Haiku build.
- **No em-dashes** in any user-facing copy.
- **Local-first**: no auto-commit, no auto-deploy. Prod actions (migration apply, deploy, prod env changes) need explicit owner sign-off. Confirm root cause vs real data before prod changes.

## What is built (inventory)
- Migration: `supabase/migrations/20260701000001_lead_contactability_nurture.sql` (4 tables + funnel view + `leads.status` extension; RLS service-role-only; additive/idempotent). **NOT applied to any DB yet.**
- Shared engine (site-agnostic): `packages/web-shared/lead-nurture/{config,tokens,send,cron}.ts` (reactive, multi-channel, crash-safe scheduler).
- Property glue: `Property/web/src/lib/leads/{verify,channels,contactability,handoff,submit-client}.ts`, `src/config/lead-nurture.ts`, `src/lib/emails/lead-service-template.ts`.
- Routes: `src/app/api/leads/{submit,confirm/[token],inbound/twilio,booking}/route.ts`, `src/app/api/cron/lead-nurture/route.ts`.
- Forms/UX: `src/components/forms/{LeadForm,MiniCapture}.tsx`, `src/app/thank-you/page.tsx`, `src/config/site.ts` (consent notice).
- Console: `packages/web-shared/console/adminData.ts` + `console/web/src/app/site/[siteKey]/page.tsx` ("Lead contactability" card).
- Cron: `Property/web/vercel.json` (added hourly `/api/cron/lead-nurture`).
- Tests: `packages/web-shared/lead-nurture/lead-nurture.test.ts`, `Property/web/src/tests/lead-nurture.test.ts`, `Property/web/src/tests/lead-nurture.playground.test.ts` (scenario simulator). Probe: `scripts/lead_nurture_probe.mjs`.
- Docs: `docs/property/LEAD_NURTURE_SYSTEM.md` (runbook + env + go-live), `docs/property/ops/DJH_FORWARDING_SOP.md` (updated: forward only the "READY FOR DJH" contactable email).

## Hardening pass already done (do NOT redo)
Crash-safe claims (insert `pending`, take over stale/failed rows); opt-out cannot be resurrected by a later confirm link; dormancy gap closed (submit route enrols/fires only when armed); mixed skip+fail no longer drops the failed channel; Twilio signature port-strip; durable send-failure visibility (`send_failed` events + `failed` status); advance step-guard; email-only dedupe (removed injectable `or` filter); VoIP held for manual review; dual admin module consolidated (Property `admin.ts` re-exports web-shared).

## Commands
```
# tests
cd packages/web-shared && npx vitest run lead-nurture
cd Property/web && npx vitest run              # full Property suite
cd Property/web && npx tsc --noEmit            # typecheck
# scenario simulator (safe: no DB, no sends) — edit SCENARIOS array to try inputs
cd Property/web && npx vitest run src/tests/lead-nurture.playground.test.ts
# migration apply (needs sign-off) — staging first
python scripts/apply_web_analytics_migrations.py staging 20260701000001
python scripts/apply_web_analytics_migrations.py prod 20260701000001
# deployed probe (source=test, self-cleaning, never reaches DJH)
node scripts/lead_nurture_probe.mjs https://www.propertytaxpartners.co.uk
```
Supabase refs: prod `dhlxwmvmkrfnmcgjbntk`, staging `fyabqbuklfrjqjxaofcx`.

## Go-live gap (ordered) — this is the remaining work
1. **Apply the migration** to staging, verify, then prod (sign-off).
2. **Env vars** — set in the **Vercel project env** (prod) and/or `Property/web/.env.local` (local). The app does NOT read the repo-root `.env`. Full list + meanings in the runbook; the on-switches are `LEAD_NURTURE_ENABLED`, `LEAD_NURTURE_EMAIL_ENABLED`, `LEAD_NURTURE_SMS_ENABLED` (leave WhatsApp off), plus `LEAD_NURTURE_TOKEN_SECRET` (32+ chars).
3. **Twilio**: DONE except the number. `.env.local` has the verified `AC…` SID, Auth Token and SK API-key pair. Remaining: buy a UK mobile number → `TWILIO_SMS_FROM`; set the number's inbound Messaging webhook → `…/api/leads/inbound/twilio`.
4. **Booking**: native `/book` flow, nothing to provision (Cal.com dropped 2026-07-01).
5. **Deliverability**: confirm DMARC on propertytaxpartners.co.uk + send one real external test email and confirm it lands (external nurture email has never been sent before). Confirm `team@` / `hello@` are real, monitored addresses.
6. **Observability layer** (next-phase design in the runbook / chat): `vw_lead_nurture_health` view, funnel bottleneck reading, stuck-lead + failed-send detector, daily digest/alerts. Owner sequenced this AFTER testing/env. Foundation (durable failure events) already in place.
7. **Solicitor** eyeball of the service-contact notice wording.
8. **Deploy** (manual, house process, sign-off) then **flip the flags**; watch the contactability funnel vs the 3/9 baseline.

## Known gotchas
- The app reads env from **Vercel** (prod) / `Property/web/.env.local` (local), NOT root `.env`.
- Twilio auth = **Account SID `AC…`** + Auth Token (an `SK…` is an API Key SID, different credential; not supported by the current code without a tweak).
- Cal.com integration = **event URL + webhook secret**, not an API key.
- Dormant by design: without the flags, insert + verify run but nothing messages; the cron short-circuits so no lead is marched to `unreachable`.
- `source='test'` leads never hit a real provider and never forward (used by the probe).
- Vercel CLI may not be installed in a fresh session (`npm i -g vercel`).

## Open items to raise with the owner
- Set the Vercel env + buy the Twilio number + create the Cal.com event (owner actions).
- Wire a local `.env.local` against **staging** if you want to dress-rehearse before prod.
- Decide when to build the observability layer (owner sequenced it next).
- WhatsApp: deferred; only revisit if SMS+email are not enough.

## Immediate next action
Either (a) wire a **staging** `.env.local` + apply the migration to staging so the whole flow can be dress-rehearsed safely, or (b) set the **Vercel env** for go-live once the owner has the `AC…` SID, Auth Token, a Twilio UK number, and a Cal.com event. Do not deploy or touch prod without explicit owner sign-off.
