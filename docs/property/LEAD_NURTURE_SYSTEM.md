# Property Lead Contactability & Nurture System

*Built 2026-07-01. Fixes the "only 3 of 9 leads were contactable" problem by verifying, nurturing, and gating leads on our side BEFORE the manual DJH forward, so only verified + genuinely responsive leads are handed over.*

## The problem
Before this, submitting a form inserted a lead straight into Supabase (client-side, anon key) and showed a static thank-you page. Nothing verified the phone/email, nothing followed up, nothing proved the lead would respond. DJH (who call the leads) found most uncontactable.

## What it does
1. **Server chokepoint** (`/api/leads/submit`) replaces the direct insert for phone-bearing forms.
2. **Real-time verification** at submit (the "verifying your details" moment): Twilio Lookup line-type (real, live, mobile?) + email deliverability. Catches dead/mistyped/non-mobile numbers before DJH ever sees them.
3. **Instant multi-channel touch** fired synchronously (sub-5-minute speed-to-lead is the #1 lever): email + SMS + WhatsApp confirming the enquiry and inviting a self-booked review.
4. **Reactive cadence** (hourly cron) of ~8 service follow-ups over 11 days (7 touches + a VIP same-day extra; full table in `LEAD_NURTURE_PROGRAMME.md`). Any two-way response halts the chase.
5. **Contactability gate**: only leads that pass verification AND actively respond (reply / book / confirm) are promoted to `contactable`, which fires an enriched "READY FOR DJH" email to the operator. Unresponsive leads are marked `unreachable` and never forwarded.
6. **Readiness dossier** (2026-07-01): the handoff email is a full evidence pack: explainable A/B/C readiness grade (0-10 score with per-point reasons), verbatim reply transcript with timestamps, response latency, best-call-window (from when they actually reply, London time), what they read on the site + calculator usage (from `web_events`), device/location, AI + Companies House enrichment. `lib/leads/dossier.ts`; pure scoring functions unit-tested.
7. **Reply auto-ack** (2026-07-01): the first genuine SMS/WhatsApp reply gets ONE immediate service-only acknowledgement ("the team will call you soon; reply with the best time and roughly how many properties you own; or pick a slot"). Their answer arrives as a normal inbound reply and lands verbatim in the dossier. Idempotent via the `ack_sent` event; fully dormancy-gated through the same ChannelSender. Replies arriving after handoff trigger a short "Lead update" email to the operator (capped at 3 per lead, `operator_update` events). `lib/leads/reply-ack.ts`.

Compliance posture: **service-only under the existing LIA**. Every message is a solicited, non-promotional follow-up about the enquirer's own enquiry (PECR solicited-comms carve-out). No marketing drip, no new consent checkbox; the point-of-collection notice discloses phone/email/SMS/WhatsApp service contact. The separate subscriber marketing engine is untouched.

## Architecture / flow
```
form -> POST /api/leads/submit (server, service role)
        honeypot -> store flagged, skip (never silent-drop)
        validate -> dedupe (24h) -> insert/update lead
        verifyLead() -> lead_verification + verify_pass/fail event
        enrol lead_nurture_state(step0, active) -> leads.status='nurturing'
        processLeadStep(0) -> instant email+sms+whatsapp, advance to step1
        return verdict -> "verifying" UX / "check your number"

hourly cron /api/cron/lead-nurture (armed by LEAD_NURTURE_ENABLED)
        due scan -> processLeadStep -> later touches, advance / mark unreachable

inbound (deterministic):
  /api/leads/inbound/twilio  (SMS/WhatsApp: YES/BOOK -> replied, STOP -> opt-out)
  /api/leads/confirm/[token] (email one-tap -> confirmed)
  /api/leads/book            (native /book slot picker -> booked)
        -> recordResponseAndEvaluate -> contactability gate
        -> promote leads.status='contactable' (once) -> enriched handoff email to operator
```

## Data model (migration `20260701000001_lead_contactability_nurture.sql`)
- `lead_verification` (1:1) — phone/email verify result + `verify_pass`.
- `lead_nurture_state` (PK lead_id+sequence) — reactive scheduler: `step`, `status`, `next_action_at`.
- `lead_nurture_sends` — immutable multi-channel send log; UNIQUE (lead_id,sequence,step,channel) = claim-before-send idempotency.
- `lead_contact_events` — the contactability audit trail feeding the gate.
- `leads.status` extended: + `nurturing`, `contactable`, `unreachable`, `forwarded` (now actually written).
- `vw_lead_contactability_funnel` — submitted -> verified -> messaged -> responded -> contactable / forwarded / unreachable, per site.
All RLS service-role-only. Additive + idempotent. Apply via `python scripts/apply_web_analytics_migrations.py {staging|prod} 20260701000001` (needs sign-off; prod ref `dhlxwmvmkrfnmcgjbntk`, staging `fyabqbuklfrjqjxaofcx`).

## Engine + Property glue (files)
- Shared engine (site-agnostic): `packages/web-shared/lead-nurture/{config,tokens,send,cron}.ts` — clones the subscriber engine's claim-before-send + due-scan, but lead-scoped, multi-channel, and reactive (status-guarded advance so it never clobbers a `contactable` lead or loops).
- Property: `src/lib/leads/{verify,channels,contactability,handoff,dossier,reply-ack,submit-client}.ts`, `src/config/lead-nurture.ts` (sequence copy + buildContext), `src/lib/emails/lead-service-template.ts`.
- Routes: `src/app/api/leads/{submit,confirm/[token],inbound/twilio,book}/route.ts`, `src/app/api/cron/lead-nurture/route.ts`.
- Forms/UX: `src/components/forms/{LeadForm,MiniCapture,BookingPicker}.tsx`, `src/app/{thank-you,book}/page.tsx`, `src/lib/leads/booking.ts`, `src/config/site.ts` (notice).
- **Native booking (2026-07-01, replaces Cal.com)**: nobody on our side attends a calendar, so booking is our own `/book` page (signed lead token `t`, minted at submit + in every nurture message): next 10 weekdays x 3 call windows (morning 9-12 / afternoon 12-3 / late afternoon 3-5:30). Picking a slot posts to `/api/leads/book`, records a `booked` event with the human slot label, and promotes through the same gate; the slot lands in the DJH dossier ("Booked callback: Tue 14 Jul, morning (9am to 12pm)"). The thank-you page embeds the picker inline right after submit via a `bt` token in the redirect. Re-booking is allowed (latest slot wins). No external scheduler, no Cal.com env, no webhook secret.

## Contactability gate rule
`contactable` iff the lead has RESPONDED and the PHONE is proven:
- Reply via SMS/WhatsApp -> proves the number -> contactable.
- Booked callback OR email one-tap confirm -> contactable, provided the phone is not known-invalid (DJH call by phone).
- Booked/confirmed but phone invalid -> surfaced for manual review, not auto-promoted.
Promotion is idempotent (status filter) so the handoff email fires exactly once.

## Dormancy (safe by default)
Nothing messages a real person until armed. Two layers:
- The channel sender only calls a provider when `LEAD_NURTURE_ENABLED` AND the per-channel flag is on AND creds exist; otherwise it returns skipped (state still advances in tests).
- The cron short-circuits unless `LEAD_NURTURE_ENABLED` is set, so leads are never marched to `unreachable` while dormant.
Test isolation: `source='test'` leads never hit a real provider and the handoff email is skipped (for the synthetic probe).

## Environment variables
Reused (already set in prod): `RESEND_API_KEY`, `SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `COMPANIES_HOUSE_API_KEY`, `AI_GATEWAY_API_KEY`, `LEADS_NOTIFY_TO_PROPERTY`.

New:
| Var | Purpose |
|---|---|
| `LEAD_NURTURE_ENABLED` | Master arm ("1"). Off = fully dormant. |
| `LEAD_NURTURE_EMAIL_ENABLED` / `_SMS_ENABLED` / `_WHATSAPP_ENABLED` | Per-channel arm. |
| `LEAD_NURTURE_TOKEN_SECRET` | 32+ chars. Signs the email one-tap confirm/opt-out links. |
| `LEAD_SERVICE_FROM_EMAIL` / `LEAD_SERVICE_FROM_NAME` / `LEAD_SERVICE_REPLY_TO` | Service email identity (e.g. team@ / "Property Tax Partners" / hello@). |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` | Lookup (verify), SMS/WhatsApp send, inbound signature check. Account SID must be the `AC…` one. |
| `TWILIO_API_KEY_SID` / `TWILIO_API_KEY_SECRET` | Optional alternative auth for outbound send + Lookup (an `SK…` API key pair). Requires `TWILIO_ACCOUNT_SID` (`AC…`) alongside it; `TWILIO_AUTH_TOKEN` is STILL required for inbound webhook signature validation (Twilio signs with the Auth Token, never an API key secret). |
| `TWILIO_SMS_FROM` | UK two-way long number (+44...). |
| `TWILIO_WHATSAPP_FROM` | WhatsApp sender number (+44...). |
| `TWILIO_WA_CONTENT_LEAD_WELCOME` / `TWILIO_WA_CONTENT_LEAD_REMINDER` | Twilio Content SIDs for the approved utility templates. |
| `EMAIL_VERIFY_API_KEY` | Optional ZeroBounce mailbox check (falls back to MX). |

New (2026-07-02 psychology/AI programme; all default OFF):
| Var | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Server-only. Powers AI copy generation, the DJH call brief, inbound-email classification, and concierge intent classification (Claude via `lib/ai/anthropic.ts`; the model never receives name/email/phone). |
| `LEAD_COPY_AI_ENABLED` | "true" arms per-lead AI-personalised sequence copy (QA-gated, static fallback per step). GATED on the privacy-notice update naming Anthropic as processor. |
| `LEAD_CONCIERGE_ENABLED` | "true" arms the bounded SMS/WhatsApp booking concierge (closed template set, intent-classification only, turn cap, tax questions always escalate). GATED on owner review of the red-team suite. Off = the original single auto-ack. |
| `LEAD_RESEND_WEBHOOK_SECRET` | Svix secret for the lead-scoped Resend events webhook (`/api/leads/events`: opened/clicked/bounced/complained). |
| `LEAD_RESEND_INBOUND_SECRET` | Svix secret for Resend inbound email (`/api/leads/inbound/email`: replies count as responses). |

Retired 2026-07-01 (native `/book` replaced Cal.com): `LEAD_BOOKING_URL`, `NEXT_PUBLIC_LEAD_BOOKING_URL`, `CAL_WEBHOOK_SECRET`.

## Psychology/UX/AI programme (built 2026-07-02, plan `.claude/plans/okay-i-mean-for-async-wirth.md`)
- **Sequence**: 7 touches + VIP extra over ~11 days (was 9/14), each touch a named psychological mechanism; day-2 email GIVEs (their calculator + review preview); day-11 warm breakup. Quiet hours + best-send-hour via `lib/leads/send-window.ts` (no email 21:00-08:00, no SMS 21:00-09:00, Sat 10:00-18:00, Sun -> Mon; Europe/London, DST-safe). Step 0 split: t0_email instant, t0_sms instant-if-in-window else next window open.
- **T0 experiment**: `t0Variant(leadId)` hash-splits the first email 50/50: branded booking-CTA vs plain person-shaped question-led ("Have I got that right?", reply as CTA). Recomputable offline, no storage.
- **Personalisation**: echoes of the lead's own three answers (`parseEnquiryEchoes`/`normaliseEcho`, category fallback), intent-mapped calculator links; AI-generated per-lead copy (`lib/leads/sequence-gen.ts`) stored fully-resolved in `lead_nurture_state.generated_copy`, regenerated on reply (cap 2). **Glass wall rule**: journey data shapes selection, never appears in copy (QA-gate enforced).
- **QA gate**: `lib/ai/qa-gate.ts` blocks every AI output that has dashes, advice verbs, figures, credentials, US spellings, creepy phrases, non-allowlisted URLs; failure = static fallback.
- **Aftercare**: booked-slot reminders (T-24h email; same-day SMS for afternoon/late windows) + `/api/leads/ics` calendar file + prep copy; abandoned-booking one-off nudge (`lib/leads/aux-cron.ts`, runs inside the hourly cron).
- **Reactivity**: Resend opened/clicked -> hesitation variant (clicked-not-booked) and email->SMS channel shift (3 unopened); `booking_viewed` beacon; inbound EMAIL replies now count as responses (gate: like `confirmed`, phone must not be known-bad); spam complaints alert the operator (alert-only v1).
- **Concierge**: `lib/leads/concierge.ts` books slots / captures best-time + portfolio / answers 5 fixed FAQs / escalates everything else by SMS reply. The model ONLY classifies intent; every outbound reply is a fixed template; 74-test adversarial suite. Live red-team with a real key + owner transcript review is an ARMING gate.
- **DJH call brief**: `lib/leads/call-brief.ts` adds a QA-gated "How to open this call" section to the handoff dossier, grounded in the lead's verbatim enquiry.
- **On-site continuity**: booking token persisted client-side at submit; returning unbooked leads get "Pick your callback slot" via ReturningBar/StickyCTA and the assistant widget switches to booking-concierge mode instead of going silent; thank-you page shows a 3-step endowed-progress rail.
- **Deliverability**: List-Unsubscribe + one-click headers on every nurture email; `/api/leads/optout/[token]` route.

## External accounts to provision (owner)
- **Twilio**: account, a UK two-way number, WhatsApp sender. Configure the inbound webhook (SMS + WhatsApp) to `https://www.propertytaxpartners.co.uk/api/leads/inbound/twilio`. (Account + creds verified 2026-07-01; only the number purchase remains.)
- **Meta WhatsApp Business** verification + utility-template approval (~1-2 weeks). Start early; WhatsApp activates on approval, does not block the rest.
- ~~Cal.com~~ no longer needed: booking is the native `/book` flow.
- **ZeroBounce** (optional).
- **DMARC** on propertytaxpartners.co.uk (SPF+DKIM already present) + a real external deliverability test before relying on email.

## Go-live sequence
1. Apply the migration (staging -> verify -> prod, on sign-off).
2. Set the identity/secret env: `LEAD_NURTURE_TOKEN_SECRET`, `LEAD_SERVICE_*`, `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`/`TWILIO_SMS_FROM` (+ optionally `TWILIO_API_KEY_SID`/`TWILIO_API_KEY_SECRET`). Local `.env.local` already holds everything except `TWILIO_SMS_FROM`; mirror into Vercel.
3. Configure the Twilio inbound webhook on the purchased number.
4. Deploy DORMANT (no `LEAD_NURTURE_ENABLED`). Run the synthetic probe; prove deliverability + Twilio Lookup on real data.
5. Flip on: `LEAD_NURTURE_ENABLED=1`, `LEAD_NURTURE_EMAIL_ENABLED=1`, `LEAD_NURTURE_SMS_ENABLED=1`.
6. After Meta approval: set `TWILIO_WHATSAPP_FROM` + `TWILIO_WA_CONTENT_*`, then `LEAD_NURTURE_WHATSAPP_ENABLED=1`.
7. Watch the contactability funnel (console card) vs the 3/9 baseline.

## Testing / verification
- Unit + golden tests under the Property/web + web-shared test suites (verify verdict, gate, scheduler claim-before-send + advance, tokens, keyword parsing, dedupe, templates).
- Non-polluting synthetic probe: submit a `source='test'` lead -> stubbed verify -> simulate a reply -> assert `contactable` -> assert the handoff was skipped-for-test (never emailed) -> clean up.
- Kill switch: unset `LEAD_NURTURE_ENABLED` -> system inert. Migrations additive; the manual DJH forward is the ultimate human backstop.
