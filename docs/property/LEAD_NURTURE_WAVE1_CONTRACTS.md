# Wave 1 — lead-safety code fixes: pinned contracts (2026-07-02)

Architect: Opus. Builders: Sonnet sub-agents on NON-OVERLAPPING file slices. Manager (architect)
owns the engine-core slice, integration, gates, and the deferred decision-gated slices.

**Wave 1 is CODE-ONLY** — no DB migration. `leads.status` already permits `unreachable`/`forwarded`
(migration 20260701000001:143-148); the retry cap uses existing `lead_nurture_sends.sent_at` age, not
a new column. Deploy alone after Wave 0, full gate chain + live probe, owner sign-off.

## House rules (every builder)
- No em-dashes in user-facing copy (commas/parentheses/full stops). British English.
- Dormancy is sacred: never send outside the existing `buildLeadChannelSender`/flag gating.
- Inbound webhook + page-render paths must NEVER throw to the caller (swallow + log, ack 200 / render).
- `source==='test'` leads must never reach a real provider.
- Touch ONLY your assigned files. Add focused unit tests for pure logic you introduce. Do NOT run the
  workspace-wide build; the architect runs the full gate chain at integration.
- Preserve existing behaviour that is not named in your contract (idempotency, token TTLs, RFC 8058 POST).

## Slice partition (disjoint file ownership)

| Slice | Owner | Files | Findings |
|---|---|---|---|
| S1 Engine core | **Architect** | web-shared lead-nurture/{send,cron,config}.ts; Property api/cron/lead-nurture/route.ts; config/lead-nurture.ts; api/leads/events/route.ts; web-shared lead-nurture.test.ts; tests/lead-events.test.ts | ENG-01, ENG-02, ENG-05, ENTRY-2, INBOUND-3, M2, AN-1, AN-3, ENTRY-3(partial) |
| S2 Confirm/opt-out de-GET | Builder A | api/leads/confirm/[token]/route.ts; api/leads/optout/[token]/route.ts | INBOUND-1, INBOUND-2, ENG-03 |
| S3 SMS opt-out intent | Builder B | api/leads/inbound/twilio/route.ts; lib/leads/reply-ack.ts; NEW lib/leads/reply-intent.ts (+test) | H1, INBOUND-4 |
| S4 Booking de-GET + ts | Builder C | app/book/page.tsx; components/forms/BookingPicker.tsx; NEW api/leads/booking-viewed/route.ts | INBOUND-8, AN-4, ENTRY-3(book) |
| S5 Dedupe adopt phone/name | Builder D | api/leads/submit/route.ts | ENTRY-1 |
| S6 Handoff retry | Builder E | lib/leads/handoff.ts; lib/leads/contactability.ts | INBOUND-5 |
| S7 Notify banner | **Architect** (decision) | api/leads/notify/route.ts | GAP-5 |
| S8 Re-park subscriber drip | **Architect** (decision) | api/nurture/send/route.ts; config/nurture.ts | GAP-1 |
| forwarded writer | **Architect** (decision) | lib/leads/contactability.ts (after S6) | AN-2 |

## S1 — Engine core (architect)
1. **ENG-02 test isolation.** `runLeadNurtureCron` currently takes one `sender` built `{live:true}`.
   Change its signature to accept `senderForLead: (lead) => ChannelSender`. Property route passes
   `(lead) => buildLeadChannelSender({ live: lead.source !== 'test' })`. Update the shared test.
2. **ENG-01 / M2 dispatch window.** Add optional `dispatchGate?(step, nowMs): { ok: boolean; retryAtMs?: number }`
   to `LeadNurtureConfig`. In the cron, per due row, call `config.dispatchGate?.(step, Date.now())`; if
   `!ok`, update `lead_nurture_state.next_action_at = retryAtMs` (guarded on status='active', step) and
   skip processing this tick. Property implements: SMS/WhatsApp-bearing step outside `inSendWindow(now,true)`
   → `{ ok:false, retryAtMs: computeNextSendMs(now,0,{hasSms:true,preferMonday:false}) }`; email-only → ok.
3. **ENG-05 / ENTRY-2 retry cap + terminal.** In `send.ts`, when a step cannot advance (nothing sent,
   ≥1 failed), read the oldest `lead_nurture_sends.sent_at` for this (lead,seq,step); if `now - oldest >
   RETRY_CAP_HOURS` (=6), force-advance anyway (record a `send_failed` event meta `{reason:'retry_cap'}`),
   so a permanently-failing step can no longer wedge the lead. A lead whose channels all keep failing then
   burns through the sequence to exhaustion → unreachable.
4. **INBOUND-3 unreachable writer.** `advanceLeadState` already sets `lead_nurture_state.status='unreachable'`
   on exhaustion. Add optional `onSequenceExhausted?(leadId): Promise<void>` to config, invoked there.
   Property implements: `adminUpdate('leads', { id:eq, status:'in.(new,nurturing)' }, { status:'unreachable' })`.
5. **AN-1 / ENTRY-3 reactivity.** `config/lead-nurture.ts` engagement query selects `created_at` (line 225,228)
   but the column is `ts`. Rename `EngagementEvent.created_at`→`ts`, the select, the gte filter, and
   `decideEngagementVariant`'s reads. Update `tests/lead-events.test.ts` mock rows to `ts`.
6. **AN-3 / ENTRY-3 complaint throttle.** `api/leads/events/route.ts` `hasRecentComplaintAlert` selects
   `id,created_at,meta` + `created_at: gte` — the column is `ts`. Rename to `ts` (type + select + filter).

## S2 — Confirm / opt-out de-GET (Builder A) — INBOUND-1/2, ENG-03
Problem: bare GET on the confirm link runs `recordResponseAndEvaluate(...,'confirmed',...)` → promotes +
fires the DJH handoff; bare GET on opt-out runs `handleOptOut` → closes the lead. Email-security link
scanners fetch these URLs, creating false-contactable leads and silently opting-out real ones.
Fix (pattern: GET renders, POST mutates):
- **confirm route:** GET must NOT mutate. GET verifies the token; on valid token, render a minimal HTML
  confirmation page ("Confirm your call request" + a button that POSTs to the same URL). Add a POST handler
  that verifies the token and calls `recordResponseAndEvaluate(leadId,'confirmed','email')`, then redirects
  (303) to `/thank-you?confirmed=1`. Invalid token GET → render a graceful "link expired" page (200, no 500).
- **opt-out route:** GET must NOT mutate. GET renders a confirmation page ("Confirm you want to stop these
  messages" + button POSTing to the same URL). The EXISTING POST handler already calls `handleOptOut` and
  returns 200 — keep it and make the page's button POST to it (form post → then show a "you're unsubscribed"
  state). RFC 8058 one-click (List-Unsubscribe-Post header) must still work: the machine POST already hits
  the POST handler, unchanged. Keep token TTLs (confirm 14d, optout 1y). Never reveal token-failure reasons.
- Keep pages tiny, inline-styled, no external deps; robots noindex. No em-dashes.

## S3 — SMS opt-out intent (Builder B) — H1, INBOUND-4
Problem: `twilio/route.ts:181` uses `OPT_OUT_KEYWORDS.has(body.trim().toUpperCase())` (exact set only).
"please stop", "not interested", "wrong number" fall through to `recordResponseAndEvaluate('replied')` →
promote + DJH handoff + a "one of the team will be in touch" ack (`reply-ack.ts:38`).
Fix:
- NEW pure module `lib/leads/reply-intent.ts`: `classifyReplyIntent(body: string): 'opt_out' | 'positive' | 'ambiguous'`.
  - Normalise: trim, uppercase, strip punctuation/extra whitespace.
  - `opt_out` when the normalised text equals or CONTAINS any opt-out token/phrase: STOP, STOPALL, UNSUBSCRIBE,
    CANCEL, END, QUIT, "PLEASE STOP", "STOP TEXTING", "STOP MESSAGING", "NOT INTERESTED", "NO THANKS",
    "WRONG NUMBER", "REMOVE ME", "DO NOT CONTACT", "LEAVE ME ALONE", "OPT OUT", "UNSUBSCRIBE ME". (Word-boundary
    aware so "stopwatch" does not match; a bare "STOP"/"NO" as the whole message = opt_out.)
  - `positive` when it clearly signals engagement: YES, YEAH, YEP, "GO AHEAD", "SOUNDS GOOD", "PLEASE CALL",
    "CALL ME", "OK"/"OKAY", "SURE", a time/day ("AFTER 6", "TOMORROW", "MONDAY"), or a question.
  - `ambiguous` otherwise (anything not clearly opt-out or positive).
  - Fully unit-tested (reply-intent.test.ts) incl. every finding example ("please stop","not interested","wrong number").
- `twilio/route.ts`: replace the keyword check with `classifyReplyIntent(body)`:
  - `opt_out` → `stopNurture(leadId, channel)` (as today's STOP path).
  - `positive` → `recordResponseAndEvaluate(leadId,'replied',channel,{body})` + existing concierge/ack path.
  - `ambiguous` → record `recordLeadContactEvent(leadId,'operator_update',channel,{kind:'needs_review',body})`.
    Do NOT promote, do NOT ack a call, do NOT run concierge. (Keeps the false-handoff and false-ack from firing.)
- `reply-ack.ts`: `buildAckBody`/`acknowledgeReply` are only ever called on the `positive` path now, so
  the "team will be in touch" promise is correct. No copy change required, but confirm the ambiguous path
  never reaches `acknowledgeReply`.
- Route must still always return the empty TwiML 200 and never throw.

## S4 — Booking de-GET + ts (Builder C) — INBOUND-8, AN-4, ENTRY-3(book)
Problem: `book/page.tsx` (server component) records `booking_viewed` on a bare GET → an email link scanner
triggers the abandoned-booking SMS nudge (`aux-cron.ts:357`). Dedupe query uses non-existent `created_at`.
Fix:
- `book/page.tsx`: REMOVE the server-side `recordLeadContactEvent('booking_viewed')` block. Still render the
  page + BookingPicker exactly as now (token passed to the picker).
- NEW `api/leads/booking-viewed/route.ts` (POST): body `{ token }`; verify the `book` token; dedupe
  once-per-day using `lead_contact_events` filtered on `ts: gte.<24h ago>` (NOT created_at); if none, record
  `booking_viewed`,`web`. Never throws; returns `{ ok: true }` 200 regardless. `runtime='nodejs'`, dynamic.
- `BookingPicker.tsx`: on mount (client `useEffect`, requires real JS execution so scanners never trigger it),
  fire-and-forget `fetch('/api/leads/booking-viewed', { method:'POST', body: JSON.stringify({ token }) })`,
  once per mount, errors swallowed. Do not block the picker UI.

## S5 — Dedupe adopt phone/name (Builder D) — ENTRY-1
Problem: `submit/route.ts:139-144` dedupe UPDATE writes only `{message, role, submitted_at}`; a corrected
phone/name from the "check it and submit again" UX is discarded, and an email-only prior row (empty
phone/name from ResourceGate/SpecialistWidget) is never populated.
Fix (dedupe branch only):
- Extend the dedupe SELECT (line 126-133) to also return `full_name, phone, message`.
- On dedupe UPDATE: set `full_name` and `phone` to the NEW submitted values when they are non-empty (adopt
  the correction / populate an empty prior row); APPEND the new message to the existing one when both are
  non-empty and differ (e.g. `existing + "\n\n---\n" + new`), else use whichever is present; keep `role`,
  `submitted_at` as now. Do not touch the insert branch. Step 4 verification already re-runs on the new phone
  (it upserts `lead_verification` onConflict lead_id), so the corrected number is re-verified automatically.
- Best-effort/isolated exactly as now: a dedupe-update failure must never lose the lead or 500.

## S6 — Handoff retry (Builder E) — INBOUND-5
Problem: `contactability.ts:134-135` records the `handed_off` event THEN calls `sendContactableHandoff`,
which THROWS on Resend error (`handoff.ts:224`). A transient failure loses the READY-FOR-DJH email while the
audit trail still says `handed_off`.
Fix:
- `handoff.ts`: `sendContactableHandoff` must NOT throw on send error. Add an internal retry (up to 3
  attempts, short backoff) around the Resend call. Return `HandoffResult` with `sent:false` + a `reason`
  string on final failure (keep the existing `skipped:'test'|'no-resend'|'no-lead'` shapes). Never throw.
- `contactability.ts` `promoteIfContactable`: keep the idempotent `leads` flip to `contactable`. Then call
  `sendContactableHandoff`. Record the `handed_off` event ONLY when `handoff.sent === true` OR it was a
  legitimate skip (`test`/`no-resend`/`no-lead` — dormant/probe, not a real failure). On a real failure
  (`sent:false` and not a skip), record a `send_failed` event meta `{kind:'handoff_failed', reason}` and
  fire a minimal operator alert email (subject "Handoff email failed: <name>", to `resolveLeadTo(source)`)
  so a human notices. The `leads.status` stays `contactable` (NOT downgraded), so a later re-attempt path
  can still find it. Return the handoff result. Never throw out of promoteIfContactable.
- NOTE for architect: the `forwarded` status flip (AN-2) will be layered here after the owner decision;
  leave the success branch structured so a one-line `contactable→forwarded` flip can be added.

## Deferred, decision-gated (architect applies after owner picks)
- **GAP-5 notify banner:** add a "Nurture in progress — do NOT forward yet; wait for the READY handoff email"
  banner to Property-lead notify emails (or suppress the per-INSERT notify). Owner decision.
- **GAP-1 subscriber drip:** re-park `/api/nurture/send` behind a dedicated flag (default off) so CRON_SECRET
  alone no longer arms it, or consciously own it. Owner decision.
- **AN-2 forwarded writer:** define what `forwarded` means (auto on handoff-send vs operator-confirmed vs
  keep unreachable-only). Owner decision.

## Gates (architect, at integration)
web-shared vitest + Property vitest + `tsc --noEmit` + local `next build`. Then deploy alone + live probe
(WebFetch the de-GET confirm/opt-out pages render without mutating; synthetic source='test' submit stays safe;
clean any probe rows). Owner sign-off before the prod deploy.
