# Lead-nurture audit fix programme — SESSION KICK-OFF (written 2026-07-02)

**READ THIS FIRST.** This is the execution brief for fixing the confirmed findings of the
2026-07-02 end-to-end audit (68-agent adversarial workflow) of the live lead-nurture system.

## Context in 5 lines

- System = everything between form submit and DJH handoff. LIVE + ARMED in prod since 2026-07-02
  (email+SMS sending to real leads). Branch `property-onsite-assistant-mvp`, deployed HEAD `f90e029b`.
- Audit verdict: build/deploy/test claims all TRUE (706/326 green, prod state verified, owner SMS
  loop proven) but 1 CRITICAL + ~6 HIGH + ~20 MEDIUM findings confirmed; ZERO refuted under
  adversarial verification.
- **Full findings with evidence + file:line: `docs/property/LEAD_NURTURE_AUDIT_2026-07-02.result.json`**
  (357KB). Extract one finding by ID:
  `$r=(gc docs\property\LEAD_NURTURE_AUDIT_2026-07-02.result.json -Raw|ConvertFrom-Json).result; $r.audits.confirmed | ? id -eq 'INBOUND-1'`
  (critic findings live under `$r.completeness.findings`).
- Background docs: `LEAD_NURTURE_SYSTEM.md`, `LEAD_NURTURE_PROGRAMME.md`, `LEAD_NURTURE_OBSERVABILITY.md`,
  `LEAD_NURTURE_HANDOFF.md` (same dir). Legal: `legal/Lead_Generation_and_Data_Sharing_Agreement_FOR_SIGNATURE.md`
  (Annex B.1 wording at ~line 384-394), `legal/GO_LIVE_SITE_FLIP.md`, `legal/Legitimate_Interests_Assessment.md`.

## Operating model (locked owner rules)

- **Architect = Fable/Opus**: plan, decompose into pinned contracts, review, integrate, run gates.
  **Builders = Sonnet sub-agents** in parallel on NON-OVERLAPPING file slices. Haiku = grunt only.
- Owner sign-off BEFORE every prod deploy and before any user-facing copy change (Wave 0 especially).
- Isolate variables: Wave 0 deploys ALONE before Wave 1 lands.
- Gates per wave: Property vitest + web-shared vitest + tsc + **local `next build`** (it catches
  ESLint/route-export fatals that tsc+vitest miss) + post-deploy live probe.
- Deploy from REPO ROOT: `VERCEL_ORG_ID=team_XF9WAygZX7SGk9Fo4tOAnihH VERCEL_PROJECT_ID=prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU npx vercel --prod --yes`.
  Console redeploy: same but `prj_6GGcP8azGfURciTo2YKr9XD3ft2U` (rootDirectory console/web).
- Probe caution: `scripts/lead_nurture_probe.mjs` is source='test' safe at submit, BUT finding ENG-02
  says the cron real-sends to test leads at steps >= 2 — clean probe rows immediately after probing.

## WAVE 0 — stop the bleed (first hour, owner decisions required)

1. **C1 (CRITICAL, contract breach)**: restore the DJH point-of-collection acknowledgement on ALL
   lead-capture surfaces (LeadForm, MiniCapture, SpecialistWidget; consent copy in
   `Property/web/src/config/site.ts` ~lines 16-21 — the 2026-06-25 revert comment is there).
   NOTE: the revert was owner-directed, so present the conflict squarely: Annex B.1 requires naming
   DJH on each form and B.4 forbids weakening without DJH's written agreement. Owner picks:
   (a) restore B.1 wording, (b) get DJH written OK for softer wording, or (c) pause forwarding.
   `consent_text` audit rows are currently recording the weakened wording as lawful-basis evidence.
2. **H3**: set `LEAD_RESEND_WEBHOOK_SECRET` in Vercel prod + create the matching webhook in the
   Resend dashboard → `/api/leads/events` (route currently 503s: `app/api/leads/events/route.ts:131-135`).
   Until then bounces/complaints are invisible and the complaint guardrail is blind.
3. **GAP-6**: owner sets Twilio auto-recharge/balance alert (balance was £18.10).

## WAVE 1 — lead-safety code fixes (Sonnet builders, pinned contracts)

- **INBOUND-1/2/8 + ENG-03**: de-GET the side-effect links. Confirm, opt-out and `/book` viewed-event
  must not mutate on bare GET (email scanners falsely promote leads → DJH handoff, silently opt-out
  real leads, trigger nudges). Pattern: GET renders a page whose button POSTs.
- **H1/INBOUND-4**: SMS opt-out matching — normalise case/punctuation, add phrase list ("please stop",
  "not interested", "wrong number", "unsubscribe"); ambiguous inbound must NOT promote/ack/handoff.
- **ENTRY-1**: dedupe resubmit must adopt corrected phone/name, APPEND message, re-notify operator
  (`app/api/leads/submit/route.ts:118-162`).
- **ENG-05 + ENTRY-2 + INBOUND-3 + AN-2**: retry cap + terminal state for failing channels, and
  IMPLEMENT the `unreachable` (sequence exhausted, no response) and `forwarded` status writers —
  today NO code writes either, so funnel/console/digest read 0 forever.
- **ENTRY-3/AN-1/AN-3/AN-4**: fix `lead_contact_events.created_at` → `ts` in the 3 live queries
  (engagement reactivity is inert, complaint-alert throttle broken, booking_viewed dedupe broken).
- **INBOUND-5**: handoff email must not mark `handed_off` unless the send succeeded; add retry.
- **GAP-5**: gate/retire the per-INSERT operator notify email for Property leads (it bypasses the
  contactability gate). Owner decision: keep as heads-up (relabel) or suppress until gate passes.
- **GAP-1**: re-park the legacy subscriber drip `/api/nurture/send` (un-parked by go-live) or own it.
- **ENG-01/M2**: enforce send-window/quiet-hours AT DISPATCH TIME, not only scheduling time.
- **ENG-02**: cron must never real-send to `source='test'` leads.

## WAVE 2 — analytics + observability (parallelisable with late Wave 1)

- **AN-6**: T0 experiment readout — persist variant (nurture_state col or event payload) + console/SQL
  readout; else the experiment is decorative.
- **AN-7**: windowed funnel (7d/28d) so weekly questions are answerable; **GAP-7**: exclude the 47
  pre-go-live leads from funnel denominators.
- Surface dark data: opened/clicked, booking_viewed stage; stop aux-cron reminder sends inflating
  step-health steps 0-1.
- **GAP-3**: cron heartbeat (cron writes last-run row; console + digest show staleness) so a dead cron
  is distinguishable from a quiet day.
- **GAP-4**: document the SQL pause fallback (`UPDATE lead_nurture_control SET paused=true...`) in
  the runbook + REDEPLOY estate-console so the Pause button is actually live.

## WAVE 3 — compliance hardening + test debt

- **M1**: implement the 3-month retention purge the live privacy notice promises.
- **M3**: surface post-handoff opt-outs to operator (contractual 2-working-day DJH notification).
- **M4**: gate EVERY AI call-site on its feature flag (inbound classifier + call-brief currently gate
  only on ANTHROPIC_API_KEY presence). **H2**: build Resend inbound routing for reply-to, or change
  email copy to stop promising "reply to opt out" until it exists.
- **M5**: dossier fields vs Annex A field spec — architect reviews with the legal docs open.
- **GATES-1..4**: route-level tests for `/api/leads/submit` + Twilio inbound webhook (copy the pattern
  from `lead-events.test.ts` / `inbound-email.test.ts`), kill-switch + cron-auth tests, guardrail layer.
- **GAP-8**: timing-safe compare + dedicated secret for `/api/leads/generate-sequence`.

## Deferred/known-open (do not re-litigate)

Autopause arming, AI copy flag (needs privacy notice naming Anthropic), concierge flag (needs
red-team), console per-site retirement, WhatsApp. LOW/INFO findings live in the JSON if capacity allows.
