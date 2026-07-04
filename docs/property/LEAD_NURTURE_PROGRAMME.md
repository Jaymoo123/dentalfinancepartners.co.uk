# Property Lead Nurture Programme: Design Rationale

*Reconstructed 2026-07-02 from implementation code. Source of truth is always the code; this document records the why and how so design decisions survive context loss. Read alongside `docs/property/LEAD_NURTURE_SYSTEM.md` (env/go-live runbook) and `docs/property/LEAD_NURTURE_OBSERVABILITY.md` (guardrails + console).*

---

## 1. Programme overview

The nurture programme is a server-side, multi-channel follow-up system that runs after a lead submits the enquiry form on propertytaxpartners.co.uk. Its job is to turn a web enquiry into a contactable, warm lead before any human effort is spent by DJH. It is entirely service-communication (non-marketing), runs dormant behind environment flags, and contains no auto-commit or auto-deploy.

The problem it solves: before this system, only 3 of 9 consecutive leads were contactable when DJH called. Most had dead or mistyped numbers; none had been followed up with. The programme adds phone/email verification at the point of submission, an escalating multi-channel chase sequence, a contactability gate, and an evidence-rich handoff.

The psychology and UX layer (built 2026-07-02) sits on top of the core system and adds per-lead AI copy personalisation, engagement-reactive variants, a bounded SMS concierge, booked-slot reminders, and a call brief for DJH. All of this is dormant by default and subject to explicit arming gates.

---

## 2. The 7-touch sequence

### What it does

An ordered set of 8 steps (including the optional VIP step) fires over approximately 11 days. Any two-way response (reply, booking, or one-tap confirmation) halts the sequence and promotes the lead to `contactable`. The sequence name is `property_contactability`.

This is the primary sequence for leads that arrive with a name and a usable phone. Since 2026-07-03 there is a SECOND primary sequence, `property_detail_capture`, for email-only leads missing a name and/or phone (an email-only chase that collects the missing detail(s), then routes the lead into the standard flow). `routePrimarySequence(lead)` in `Property/web/src/config/lead-nurture.ts` selects the sequence from the lead's missing contact fields. The per-touch design of `property_detail_capture`, the phone-aware exhaustion rule, and the cross-sequence gate/opt-out handling are documented in `docs/property/LEAD_DETAIL_CAPTURE.md`; this section covers the `property_contactability` cadence.

### Psychology rationale

The step-level mechanisms are grounded in established influence principles. Each touch does exactly one thing and does it for a clear psychological reason. The progression moves from reciprocity to social proof to autonomy to a warm ending, matching the emotional arc of a lead who is genuinely interested but busy.

### Full cadence (actual values from `Property/web/src/config/lead-nurture.ts`)

The cumulative delay from step 0 is documented in a comment at the top of the STEPS array: `0, 0, 4, 24, 48, 96, 168, 264` hours.

| Step key | Step index | Channel(s) | Delay from prev step (h) | Cumulative from T0 (h) | Mechanism |
|---|---|---|---|---|---|
| t0_email | 0 | email | 0 | 0 | Reciprocity: "I have read what you sent." Mirrors their words. |
| t0_sms | 1 | sms, whatsapp | 0 | 0 | Instant confirmation (fires if inside send window, else next open). |
| vip_sameday | 2 | sms | 4 | 4 | VIP touch for qualityScore === 5 only; signals priority attention. |
| day1_sms | 3 | sms, whatsapp | 20 | 24 | Commitment echo: names the lead's stated goal; holds specialist time. |
| day2_give_email | 4 | email | 24 | 48 | Generosity: gives a relevant calculator or figures-to-hand prep, without asking anything. |
| day4_sms | 5 | sms, whatsapp | 48 | 96 | Social proof: most landlords with this question found one call enough. |
| day7_email | 6 | email (or sms on channel_shift) | 72 | 168 | Fresh start plus autonomy: new week, no pressure, one decision. preferMonday: true. |
| breakup_day11 | 7 | email | 96 | 264 | Warm peak-end: stop reminders gracefully; parting insight on when to return. |

`delayHours` on each step is relative to the previous step completing, not to step 0. The scheduler in `packages/web-shared/lead-nurture/cron.ts` handles the relative advancement.

### Static copy (default when AI is disabled or fails)

All static copy is defined inline inside the `buildMessages` lambda on each step in `Property/web/src/config/lead-nurture.ts`. It includes the lead's `callGoalEcho` (derived from the guided enquiry answer), the booking URL, and opt-out phrasing. No step fires without a booking CTA.

### How it is gated

`LEAD_NURTURE_ENABLED` must be set to arm the hourly cron. The cron route short-circuits immediately if this env var is absent, so no lead is ever advanced to `unreachable` while dormant. Per-channel sub-flags (`LEAD_NURTURE_EMAIL_ENABLED`, `LEAD_NURTURE_SMS_ENABLED`, `LEAD_NURTURE_WHATSAPP_ENABLED`) must also be set for that channel to fire.

---

## 3. T0 experiment: branded vs personal first email

### What it does

The first email (step 0, `t0_email`) runs a 50/50 A/B split. One variant (`t0_branded`) sends a standard CTA email with a button and clear brand framing. The other (`t0_personal`) is a plain, person-shaped email with a question and reply as the primary CTA, no button.

### Psychology rationale

First-impression copy determines whether a lead perceives the follow-up as an automated bulk blast or a personal response to their specific enquiry. The branded variant optimises for trust and professionalism. The personal variant optimises for warmth and perceived attentiveness. The question "Have I got that right?" invites a low-effort reply, which both proves the channel and builds commitment.

### How to recompute the split

The split is determined by `t0Variant(leadId)` in `Property/web/src/config/lead-nurture.ts`:

```
function fnv1a32(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

export function t0Variant(leadId: string): "t0_branded" | "t0_personal" {
  return fnv1a32(leadId) % 2 === 0 ? "t0_branded" : "t0_personal";
}
```

FNV-1a 32-bit hash of the lead UUID. Even hash value = `t0_branded`. Odd hash value = `t0_personal`. The same lead UUID always produces the same variant, so retries are stable. The split is recomputable offline from the `leads.id` column with no database state.

The variant is also passed to the AI copy generator so the prompt's `t0_email` section matches the variant the send path will use (see section 5).

### Decisions and tradeoffs

The split is deterministic (hash, not random) to make it idempotent and auditable. Storage-free. The split cannot be changed mid-run without re-computing for every existing lead (acceptable: change the hash algorithm, not the modulo). No guardrail exists to enforce sample balance over time; at this volume (tens of leads per month), monitor the ratio manually before drawing conclusions.

---

## 4. Guided enquiry composer and echo hygiene

### What it does

The LeadForm replaces the single free-text message box with three labelled prompts. The answers are assembled client-side by `composeEnquiryMessage` in `Property/web/src/lib/leads/enquiry-message.ts` into a single string that the server stores unchanged on `leads.message`:

```
Situation: {situation}\n\nPrompted by: {prompted}\n\nWants from call: {callGoal}
```

The sequence builder calls `parseEnquiryEchoes` to recover the three parts and `normaliseEcho` to make the `callGoal` field safe to weave into "you'd like to {echo}".

### Psychology rationale

Asking three specific questions (situation, trigger, goal) produces structured, actionable data instead of a freeform note. Each field serves a distinct purpose in the nurture copy: situation grounds the dossier for DJH, triggered surfaces urgency, and call goal provides the "commitment echo" that every touch mirrors back.

### Key validation parameters (from `Property/web/src/lib/leads/enquiry-message.ts`)

- `SITUATION_MIN_CHARS = 40` (minimum trimmed length for the situation field)
- prompted: minimum 3 trimmed chars
- callGoal: minimum 3 trimmed chars

`normaliseEcho` applies a 9-step hygiene pipeline to the `callGoal` before it appears in any outbound message:

1. Strips leading filler ("I want to", "I'd like to", "I would like to", "we want to", "to ").
2. Lowercases the first character.
3. Collapses internal whitespace.
4. Strips trailing full stop.
5. Returns "" if fewer than 8 chars remain.
6. Truncates at the last word boundary before position 120 (no ellipsis).
7. Returns "" on email addresses (contains @).
8. Returns "" on URLs (http or www.).
9. Returns "" on phone-like digit runs (7+ consecutive digits).
10. Returns "" on characters outside `[a-zA-Z0-9 £%&',.()-]`.

If `normaliseEcho` returns "", the fallback is `categoryPhrase(intentCategory)`, a static map in `enquiry-message.ts` covering 6 intent categories (incorporation, section24, cgt, portfolio_structuring, mtd, non_resident), then a generic "get your property tax position clear".

### Backward compatibility

`parseEnquiryEchoes` returns `{}` for messages that do not start with "Situation: " (legacy free-text submissions). All downstream consumers handle the empty-object case gracefully.

---

## 5. AI copy generation: glass-wall rule, QA gate, and static fallback guarantee

### What it does

When `LEAD_COPY_AI_ENABLED=true` and `ANTHROPIC_API_KEY` is set, the `generate-sequence` API route fires immediately after lead submission. It calls `generateLeadSequenceCopy` in `Property/web/src/lib/leads/sequence-gen.ts`, which generates personalised copy for 6 of the 8 steps (all except `t0_sms` and `vip_sameday`, which use static copy):

```
GENERATABLE_STEP_KEYS = ["t0_email", "day1_sms", "day2_give_email", "day4_sms", "day7_email", "breakup_day11"]
```

The resolved copy (placeholders already substituted with real URLs and the lead's first name) is stored in `lead_nurture_state.generated_copy`. At send time, the `buildMessages` lambda in each step checks `ctx.generatedCopy[stepKey]` first and falls back to static copy if absent.

### The glass-wall rule

The model is never shown passive browsing data. It never receives the lead's name, email, or phone. The rule is enforced at the prompt level and at the QA gate level.

System prompt hard rule (from `buildSystemPrompt` in `sequence-gen.ts`):

> GLASS WALL: Never reference passive browsing. Banned phrases: "we saw you", "we noticed", "you visited", "you viewed", "you read", "you returned", "your visits", "you browsed", "you have been looking", "you've been looking".

The journey digest (sessions, top pages, calculator events) is passed to the model in the user prompt but is labelled "use only as context for HOW DEEPLY they researched, not to reference visits". It affects the tone of the copy, not the content of any specific reference.

The QA gate independently enforces the glass-wall patterns (see below).

### Model tiers (from `Property/web/src/lib/ai/anthropic.ts`)

| Tier | Model ID | Used for |
|---|---|---|
| haiku | `claude-haiku-4-5` | Concierge intent classification only |
| sonnet | `claude-sonnet-4-6` | Sequence copy generation, call brief |
| opus | `claude-opus-4-8` | Judging and hard reasoning (not in this programme's live path) |

Sequence generation uses `generateJson` with `model: "sonnet"`, `maxTokens: 3500`, forced tool choice (`emit`), and `cacheSystem: true` (the large system prompt is cached to reduce token spend on repeated calls).

### The QA gate

`qaGateMessage` in `Property/web/src/lib/ai/qa-gate.ts` is a pure, deterministic function with no imports. Every AI-generated step must pass it or the step is dropped. Failure = the static fallback is used instead for that step.

Rules checked (in order):

1. Em-dash (U+2014) or en-dash (U+2013) anywhere in the text.
2. Empty content.
3. Length caps: email subject max 78 chars; email paragraphs max 5, each max 500 chars; SMS max 320 chars; brief combined max 1200 chars.
4. Banned pattern groups (case-insensitive, each category reported once):
   - `advice`: "you should", "we recommend", "you must", "you need to", "we advise", "our advice", "make sure you", "you ought to".
   - `guarantee`: "guaranteed", "guarantees", "guarantee", "you will save", "risk-free", "no risk", "certain to".
   - `figures`: `£\d` or `\d%` or `\d\s*per\s+cent`.
   - `hmrc_attribution`: "HMRC says", "HMRC confirmed", "HMRC has confirmed", "according to HMRC".
   - `credentials`: "chartered", "ICAEW", "ACCA", "ACA", "CTA", "regulated by", "qualified accountant", "MLR-supervised".
   - `glass_wall`: "we saw", "we noticed", "you visited", "you viewed", "you read", "you returned", "your visits", "you have been looking", "you've been looking", "you browsed".
5. US spelling patterns: organize/optimize/analyze/color/favor/center/behavior.
6. Unknown placeholders (only `firstName`, `bookingUrl`, `confirmUrl`, `calculatorUrl`, `calculatorName`, `windowLabel` are allowed).
7. Booking CTA presence (required for email and SMS by default): must contain `{{bookingUrl}}` or a resolved URL starting with `/book`.
8. SMS opt-out: must contain `\bSTOP\b`.
9. URL allowlist: any resolved URL in the content must start with `/book`, `/api/leads/confirm`, `/api/leads/ics`, `/tools`, `/calculators`, or `/research`.

### Static fallback guarantee

If the AI is disabled, unconfigured, or the API call fails, `generateLeadSequenceCopy` returns `{ status: "disabled" }` or `{ status: "failed" }`. The send path reads `ctx.generatedCopy` and falls back silently to the static copy in `buildMessages`. No send is ever blocked by an AI failure. Partial generation (some steps pass, some fail the QA gate) produces `{ status: "partial" }` and the passing steps are used.

### Regeneration on reply

When a lead replies, `regenerateLeadCopy` in `sequence-gen.ts` regenerates copy for steps not yet sent, incorporating the reply transcript into the prompt. This allows later touches to acknowledge the conversation. Cap is 2 regenerations per lead (checked via `generated_copy._meta.regens`). Test leads (`source='test'`) are skipped to save tokens.

### How it is gated

`LEAD_COPY_AI_ENABLED=true` AND `ANTHROPIC_API_KEY` must both be set. The `copyAiEnabled()` function checks both. This flag has an additional ARMING GATE: the site's privacy notice must name Anthropic as a data processor before this flag can be activated.

---

## 6. Send window: quiet hours and best-send-hour

### What it does

`computeNextSendMs` in `Property/web/src/lib/leads/send-window.ts` maps a "due at" epoch (fromMs + delayHours) to a valid send epoch inside the send window, snapped to the lead's historical activity hour when available.

All times are Europe/London wall-clock, computed via `Intl.DateTimeFormat` with `timeZone: "Europe/London"`. Offsets are never hardcoded; DST transitions are handled automatically.

### Send window parameters (from `send-window.ts` constants)

| Context | Window |
|---|---|
| Mon-Fri, email | 08:00 to 20:30 (20:30 is the last valid minute; `WEEKDAY_CLOSE = 20 * 60 + 31` exclusive) |
| Mon-Fri, SMS/WhatsApp | 09:00 to 20:30 |
| Saturday | 10:00 to 17:59 (`SAT_CLOSE = 18 * 60` exclusive) |
| Sunday | Never |

### Best-send-hour

`bestHourFromTimestamps(isoTimestamps)` in `send-window.ts` returns the modal London hour from the lead's web session timestamps. Requires at least 3 samples; returns null below that threshold. The computed hour is stored as `lead_nurture_state.best_send_hour` and is used by `computeNextSendMs` as the `bestSendHour` option. If null, the default is 10 (10:00 London).

The hour is clamped to the channel window: email minimum 08:00, SMS minimum 09:00, both maximum 20:00.

### Day-of-week rules

- Sunday lands: rolled forward to Monday at the clamped hour.
- Saturday with `preferMonday=true` (only step 6, `day7_email`): rolled forward to Monday. This prevents a "fresh start" touch landing on Saturday, which the step's comment explicitly flags as a design intent ("day-7 email prefer Monday landing").
- Saturday without `preferMonday`: sent on Saturday, hour clamped to [10:00, 17:00].

### Minimum-gap guard

If the candidate send time is less than `max(2h, delayHours/2)` after `fromMs`, the send is pushed one London calendar day forward. This prevents a 1-hour delayed step from scheduling at the same hour as the previous step on the same day.

### Decisions and tradeoffs

No jitter is applied (returns exact epoch at :00 seconds). This is intentional: the cron fires hourly and the due-scan picks up anything overdue; deterministic scheduling aids debugging. Jitter is unnecessary at this volume.

---

## 7. Engagement-reactivity variants

### What they do

`decideEngagementVariant` in `Property/web/src/config/lead-nurture.ts` inspects recent `lead_contact_events` and `lead_nurture_sends` to decide whether a lead warrants a modified version of steps 5 and 6.

Two variants (evaluated in precedence order):

| Variant | Trigger | What changes |
|---|---|---|
| `hesitation` | A `clicked` event exists AND no `booked` event AND click is at least 24h old | Step 5 (day4_sms) swaps to friction-reducing "no-strings" copy. Step 6 (day7_email) paragraph 2 swaps to "if something is holding you back, reply and tell us." |
| `channel_shift` | emailSendCount >= 3 AND no `opened` event in the last 14 days | Step 6 (day7_email) sends an SMS instead of an email, bypassing AI-generated copy entirely. |

Hesitation takes precedence when both conditions are true (a lead who clicked is still engaged; switching to SMS would be a downgrade).

### Psychology rationale

Hesitation (clicked but not booked) signals anxiety or friction around commitment. The friction-reducing variant names the anxiety directly ("no cost, no obligation, no hard sell") rather than repeating the booking CTA as though the lead missed it.

Channel shift (no email opens after 3 sends) signals deliverability failure, not disinterest. Switching to SMS bypasses the inbox silently filtering messages. AI-generated copy is deliberately bypassed for channel_shift because personalisation is irrelevant if the channel is broken.

### Data lookup (from `buildLeadMessageContext`)

Events queried: `event_type in (opened, clicked, booked)`, last 14 days (`fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()`). Send count queried: `lead_nurture_sends` where `channel=email AND status=sent`. Both are best-effort; failure to query leaves `engagementVariant=undefined` and static copy fires.

---

## 8. Concierge: bounded SMS booking assistant

### What it does

When `LEAD_CONCIERGE_ENABLED=true`, inbound SMS/WhatsApp replies are routed to `handleInboundReply` in `Property/web/src/lib/leads/concierge.ts` instead of the one-time static ack (`acknowledgeReply`). The concierge can propose slots, confirm a booking, capture best-time and portfolio data, and answer five fixed FAQ patterns, all within a capped conversation.

### Safety architecture (the classify-only model)

The model's ONLY job is to classify the intent of an inbound message into one of 8 labels. It never generates outbound text. Every reply the lead sees is a hardcoded string literal in `handleInboundReply`. The only interpolations are code-generated: `firstName` (from `firstNameOf`), `bookingUrl` (from `mintBookingUrl`), and slot labels (from `bookingLabel`). No user-provided text is ever echoed back into outbound messages.

This design means prompt injection in the inbound message cannot alter what the lead is sent. The adversarial test suite (74 tests in `Property/web/src/tests/concierge.test.ts`) verifies the no-echo property across all intent paths.

### Intent labels and dispatch (from `concierge.ts`)

```
INTENT_LABELS = ["book_slot", "provide_besttime", "provide_portfolio", "faq_question", "optout", "tax_topic", "human_needed", "other"]
```

| Label | What happens |
|---|---|
| `book_slot` | Proposes 3 slots; transitions to `slots_proposed`. |
| `provide_besttime` | Stores `captured.best_time` (capped at 200 chars); sends "noted" reply. |
| `provide_portfolio` | Stores `captured.portfolio` (capped at 200 chars); sends "prepare" reply. |
| `faq_question` | Attempts `matchFaq` (deterministic regex, pre-AI); sends fixed answer. If no regex match, escalates. |
| `optout` | Calls `stopNurture`; transitions to `closed`; sends "we will not message you again." |
| `tax_topic` | Sends "one for the specialist" template; emails operator; transitions to `escalated`. |
| `human_needed` | Sends holding template; emails operator; transitions to `escalated`. |
| `other` | Sends holding template; emails operator; transitions to `escalated`. |

Tax always escalates. There is no tax-question answer path. The classifier system prompt explicitly states "If in doubt between tax_topic and any other label, always choose tax_topic."

### FAQ matching (deterministic, pre-AI)

Five patterns checked by `matchFaq` before the AI runs for `faq_question` intent:

| ID | Pattern | Answer |
|---|---|---|
| cost | `(cost\|price\|charge\|fee\|free)` | "The review call is completely free and there is no obligation afterwards." |
| duration | `(how long\|duration\|minutes)` | "About 20 minutes, and there is nothing to prepare." |
| who | `(who.*(call\|speak)\|which company\|who are you)` | "A property tax specialist from our partner team will call you personally." |
| prepare | `(prepare\|bring\|need.*hand)` | "Nothing formal. A rough idea of your figures helps, but the specialist works with whatever you have." |
| advice_by_text | `(just tell me\|answer here\|by text\|over message)` | "The specialist covers that properly on the call rather than by message." |

If the classifier says `faq_question` but no pattern matches, the concierge escalates rather than trying to answer.

### Slot proposal and matching

`proposedSlots()` generates 3 slots: day-0 morning, day-0 afternoon, day-1 morning (using `upcomingWeekdays` from `booking.ts`).

`matchSlotChoice` is deterministic (no AI). It accepts:
- A lone digit "1", "2", or "3".
- A short reply of 1-3 words where every word is a recognised day abbreviation, full day name, or window keyword (morning, afternoon, am, pm, etc.). Deliberately conservative: ambiguous phrasing like "maybe tuesday??" returns null and falls through to AI classification.

### Turn cap and operator escalation

- `TURN_CAP = 6`: at 6 turns the concierge sends a holding message and transitions permanently to `escalated`. No further automated handling.
- `OPERATOR_ESCALATION_CAP = 3`: operator escalation emails are capped at 3 per lead across the entire concierge + reply-ack system. This cap is shared with reply-ack's post-handoff operator update emails.

### Model usage

`classify` in `lib/ai/anthropic.ts` with `model: "haiku"` (the cheapest, fastest tier). Max tokens: 64 (a label, nothing more). `cacheSystem: true` so the classifier system prompt is cached.

If `classify` returns null (AI unavailable), the concierge escalates and emails the operator. It never silently fails.

### How it is gated

`LEAD_CONCIERGE_ENABLED=true` AND `ANTHROPIC_API_KEY`. Both checked by `conciergeEnabled()`. This flag has an ARMING GATE: a live red-team test with a real Anthropic API key AND owner review of a reply transcript must be completed before activating.

When the concierge is disabled, the inbound route falls back to `acknowledgeReply` (the single static ack).

---

## 9. Booked-slot reminders and abandoned-booking nudge

### What they do

`runLeadAuxScans` in `Property/web/src/lib/leads/aux-cron.ts` runs inside the hourly cron after the main nurture run. Two independent scans:

**Scan A: booked-slot reminders**

For every lead with a `booked` event in the last 30 days that has not yet passed:

- T-24h email: fires when `now >= slotStartMs - 24h AND now < slotStartMs`. Includes the slot label, a rescheduling booking URL, and a calendar file link (`/api/leads/ics?t=...`). Email only (no SMS for T-24h).
- T-2h SMS: fires when `now >= slotStartMs - 2h AND now < slotStartMs`. Only for afternoon and late_afternoon windows (not morning, because that slot starts at 09:00 and a 2h-prior SMS would fire at 07:00, outside the send window).

Both are idempotent via `lead_nurture_sends` claims with sequence key `booking_reminder:{date}:{window}`. Opted-out and test leads are excluded.

The `.ics` calendar file is generated by `buildIcsForSlot` using `WINDOW_BOUNDS`:
```
morning:        { startH: 9,  startM: 0, endH: 12, endM: 0  }
afternoon:      { startH: 12, startM: 0, endH: 15, endM: 0  }
late_afternoon: { startH: 15, startM: 0, endH: 17, endM: 30 }
```

**Scan B: abandoned-booking nudge**

Fires a single SMS when:
- A `booking_viewed` event exists that is at least 2h old but no more than 48h old.
- The lead's nurture state is `active`.
- No `booked` event exists for this lead.
- No `opted_out` event exists.
- The current time is inside the send window (hasSms=true).

Claimed before-send under sequence `abandoned_booking`, step 0, channel `sms`. One nudge per lead ever.

### Psychology rationale

The T-24h reminder reduces no-shows by making the appointment salient. The calendar file converts a fuzzy "I'll remember" into a hard diary entry.

The T-2h SMS exists because the risk of a no-show is highest for afternoon slots where the morning has intervened. Morning slots are omitted because a T-2h message would fall before 07:00.

The abandoned-booking nudge addresses cart-abandonment behaviour: a lead who opened the booking page but did not book has expressed clear purchase intent. A single low-friction "anything I can help with?" message converts a meaningful fraction without feeling pushy. The 2h gap prevents premature nudging (the lead may still be mid-booking). The 48h cap prevents nudging leads who have clearly moved on.

### Decisions and tradeoffs

T-2h SMS is skipped for morning windows without a fallback because the T-24h email already covered reminders for the next-day morning slot. Adding a same-day morning SMS would require a very early send window, which is excluded by the 09:00 minimum.

---

## 10. Reply auto-acknowledgement

### What it does

`acknowledgeReply` in `Property/web/src/lib/leads/reply-ack.ts` fires on every genuine inbound SMS or WhatsApp reply (non-STOP). It provides:

1. ONE immediate ack to the lead (idempotent via `ack_sent` event; never repeats). The ack asks for best call time and rough portfolio size.
2. If the lead has already been handed off (`alreadyContactable=true`), a short "Lead update" email to the operator. Capped at `OPERATOR_UPDATE_CAP = 3` per lead. The reply body is included (truncated at 300 chars). The operator email uses the shared `resolveLeadTo` routing and is fully dormancy-gated.

When the concierge is enabled, `handleInboundReply` in `concierge.ts` handles the reply instead. The concierge sends its own ack (the relevant template) and emails the operator on escalation. The operator escalation cap (`OPERATOR_ESCALATION_CAP = 3`) is shared across both systems via the `operator_update` event count.

### Psychology rationale

Speed-to-reply is the strongest predictor of conversion in inbound lead management. A lead who replies and hears nothing for hours or days interprets the silence as disorganisation or disinterest. The single ack eliminates that gap without over-messaging. Asking for best call time and portfolio size in the same message pre-qualifies the handoff and gives DJH richer context without a separate step.

---

## 11. Lead dossier (ungraded evidence pack) and the two-email handover

### What it does

`gatherLeadDossier` in `Property/web/src/lib/leads/dossier.ts` assembles every signal held about a lead into an ungraded evidence pack. The dossier feeds the internal ops email sent to the operator when a lead becomes contactable.

Signals gathered: verification (phone/email status and carrier), AI enrichment (intent category, quality score, Companies House match), on-site journey (sessions, page views, top pages, calculator usage), conversation timeline (sends, replies, bookings, confirms), best call window, and response latency.

### Two-email handover

When a lead passes the contactability gate, `sendContactableHandoff` in `Property/web/src/lib/leads/handoff.ts` sends the operator TWO emails:

1. **Forwardable brief** (subject `New qualified enquiry: {name}`). Built by `buildForwardableBrief`, rendered via the branded service-email shell. Annex-A-safe by construction: name, phone (normalised E.164), email, booked call slot (if any), the source page, and the verbatim enquiry. No verification statuses, no journey, no transcript, no buttons. The operator forwards this email to DJH as-is.

2. **Internal ops email** (subject `[Internal] {name}: log hand-over and context`). Built by `buildInternalOpsEmail`. Opens with an amber boundary box stating that only the separate brief may be forwarded. Carries the full dossier: verification detail (status/carrier), response latency, best call window, enrichment and Companies House match, on-site journey, the conversation timeline, and the one-click "I have forwarded this to DJH" log button. Never forwarded.

The brief is sent first (3 attempts with backoff). If it fails after retries the handoff reports `sent: false` and the existing failure alert fires. If the brief lands but the internal email fails, the result carries `internal: { sent: false, reason }`; the lead is still recorded as handed off, a `send_failed` event with `kind: "handoff_internal_failed"` is logged, and the operator receives an alert containing a freshly minted forwarded-log URL so the hand-over can still be logged.

A hand-over can be re-sent for a `contactable` or `forwarded` lead via `POST /api/leads/handoff/resend` (x-internal-token guarded); a successful re-send records an `operator_update` event with `kind: "handoff_resent"`.

### Best call window

`bestCallWindow(responseTimes)` buckets the lead's actual response times (from `lead_contact_events` for replied/confirmed/booked) into morning/afternoon/evening/late and returns the modal bucket. This is derived from when the lead actually replied, not from form submission time, making it a direct signal of when they pick up their phone. London time throughout.

---

## 12. DJH call brief

### What it does

`buildCallBrief` in `Property/web/src/lib/leads/call-brief.ts` generates a four-field structured brief to include in the internal ops email. It uses the lead's verbatim enquiry text, enrichment data, best call window, booking slot label (if any), top pages read, and verbatim reply transcript (up to 3 replies).

Four fields, each max 300 chars: `opening` (natural first sentence for DJH to say), `theirGoal` (one sentence), `suggestedAngle` (tone and focus, no advice), `bestWindow` (when to call and why).

Inputs: verbatim enquiry text, enrichment data (intent category, quality score, summary), best call window, booking slot label (if any), top pages read, and verbatim reply excerpts (up to 3 replies).

### Model and QA

`generateJson` with `model: "sonnet"`, `maxTokens: 512`. The QA gate runs with `kind: "brief"` and `requireBookingCta: false`. Combined field text must not exceed 1200 chars and must pass all banned-pattern checks. Returns null on any failure; the internal ops email renders an empty string in that case.

### Decisions and tradeoffs

The brief uses the verbatim `enquiryMessage` (the three labelled answers) rather than only the AI enrichment summary. This is deliberate: the enrichment summary is a lossy paraphrase. The verbatim text lets the opening line reflect the lead's exact words, which DJH can use to signal "I have read your enquiry" in the first seconds of the call.

The brief is best-effort. A null brief does not block the handoff.

---

## 13. Arming gates

Two features require explicit human action before their environment flags can be set. These gates exist because the features introduce either a legal/privacy obligation or a risk of bad automated behaviour with real leads.

### Gate 1: LEAD_COPY_AI_ENABLED

**What is gated:** Per-lead AI-generated sequence copy (`Property/web/src/lib/leads/sequence-gen.ts`). When enabled, lead message content (the three guided-enquiry answers) is sent to Anthropic's API.

**Pre-condition:** The site's privacy notice at propertytaxpartners.co.uk must be updated to name Anthropic as a data processor before this flag is set. Until it does, sending lead data to the Anthropic API creates a gap between what the privacy notice discloses and what actually happens.

**The module comment in `lib/ai/anthropic.ts`** states: "This is the single named Anthropic processor for lead-facing AI (GDPR art. 28)." Data minimisation is a caller-responsibility rule: the module must never receive name, email, or phone (and is not passed them anywhere in the lead-nurture path).

### Gate 2: LEAD_CONCIERGE_ENABLED

**What is gated:** The bounded SMS concierge (`Property/web/src/lib/leads/concierge.ts`). When enabled, inbound SMS/WhatsApp messages from real leads are classified by Haiku and receive an automated templated reply.

**Pre-condition:** A live red-team run must be completed with a real Anthropic API key, and the owner must review a real inbound reply transcript, before this flag is set. The 74-test adversarial suite covers the classification and no-echo properties in automated tests, but it cannot substitute for a human verifying that the system behaves acceptably with real-world messages.

---

## 14. Permanently rejected features

The following were explicitly considered and rejected. Do not re-propose them without new evidence that the legal or design constraints have changed.

**Voicemail drops**

Ruled out under PECR regulation 19, which prohibits automated recorded calls to residential numbers without prior consent. Even if the lead has submitted an enquiry, a voicemail drop is a separate regulated act. The phone channel is reserved for live calls by DJH.

**Multiple-messages-per-day cadence**

The sequence fires at most once per step, and no two steps have the same cumulative hour, so the minimum gap between any two touches is at least 4 hours (step 0 to step 2 on a VIP lead). A tighter cadence would exceed what a service-only communication posture can justify and would trigger deliverability signals.

**Fake scarcity**

Copy such as "we only have 2 slots left this week" or "time-sensitive" phrasing applied without a genuine constraint. Rejected on both ethical and legal grounds (Consumer Protection from Unfair Trading Regulations 2008; also a QA gate violation under the guarantee/advice banned patterns). No copy in the sequence makes claims about availability.

**Hosted DeepSeek**

Rejected on GDPR grounds. The data controller has no data processing agreement with DeepSeek and the firm's jurisdiction makes one impractical. Rejected as a hard rule in `docs/_engines/ENGINE_MAP_AND_ONBOARDING.md` (see memory `feedback_no_deepseek_opus_only.md`). All AI calls go through `lib/ai/anthropic.ts` using Anthropic's API only.

---

## 15. Observability cross-reference

The observability layer (`docs/property/LEAD_NURTURE_OBSERVABILITY.md`) provides guardrail thresholds, a daily digest, and a kill switch that pause the system without a redeploy. The key cross-links:

- `lead_nurture_control` table: `paused` flag checked in the hourly cron before any sends.
- `vw_lead_nurture_health`: feeds the guardrail evaluator (`nurture-health.ts`).
- `vw_lead_nurture_stuck`: active leads overdue by more than 3 hours. A stuck-lead alert fires at >= 3 stuck leads.
- Spam complaint auto-pause threshold: >= 2 complaints in 24h, or >= 3 in 7 days.
- Failed-send-rate pause threshold: > 25% of last-hour real attempts failed, with at least 4 real attempts.

Autopause is off by default (`LEAD_NURTURE_AUTOPAUSE_ENABLED` unset). Alerts email the operator but never pause the system until this flag is set.

---

## 16. Environment flags summary

All flags default to off (dormant). Set in Vercel project env (prod) or `Property/web/.env.local` (local dev). The app does NOT read the repo-root `.env`.

| Flag | Effect |
|---|---|
| `LEAD_NURTURE_ENABLED` | Master arm. Off = no sends, no cron advance. |
| `LEAD_NURTURE_EMAIL_ENABLED` | Arms the email channel. |
| `LEAD_NURTURE_SMS_ENABLED` | Arms the SMS channel. |
| `LEAD_NURTURE_WHATSAPP_ENABLED` | Arms the WhatsApp channel (deferred; Meta approval required). |
| `ANTHROPIC_API_KEY` | Required for AI copy generation, concierge, and call brief. |
| `LEAD_COPY_AI_ENABLED` | `true` = AI-generated per-lead copy. ARMING GATE: privacy notice must name Anthropic first. |
| `LEAD_CONCIERGE_ENABLED` | `true` = bounded SMS concierge. ARMING GATE: live red-team + owner transcript review. |
| `LEAD_NURTURE_AUTOPAUSE_ENABLED` | `1` = observability layer may auto-pause on guardrail breach. Off = alert-only. |
| `LEAD_RESEND_WEBHOOK_SECRET` | Svix secret for Resend events webhook (open/click/bounce/complaint). |
| `LEAD_RESEND_INBOUND_SECRET` | Svix secret for inbound email replies. |

---

## Appendix: discrepancies between the surviving summary and the code

The following were noted during reconstruction and should be verified by the architect:

1. **Sequence length wording.** The `LEAD_NURTURE_SYSTEM.md` summary says "~8 service follow-ups over 14 days". The code defines 8 steps (indices 0-7) with a total span of 264 cumulative hours from step 0, which is 11 days, not 14. The session 4 note in `LEAD_NURTURE_HANDOFF.md` correctly says "7-touch...sequence...over ~11 days". The SYSTEM.md figure ("14 days") may refer to the older session-1/2 cadence before the psychology pass shortened it. Verify which is current.

2. **t0_sms not in GENERATABLE_STEP_KEYS.** `sequence-gen.ts` generates copy for `["t0_email", "day1_sms", "day2_give_email", "day4_sms", "day7_email", "breakup_day11"]`. The `t0_sms` step (step 1) uses `smsMsgWithGen` with key `"t0_sms"`, but `t0_sms` is not in `GENERATABLE_STEP_KEYS`. This means no AI copy is generated for `t0_sms`. The static fallback always fires for that step. This appears intentional (the static copy for `t0_sms` is minimal and channel-appropriate), but it is not explicitly documented.

3. **LEAD_NURTURE_HANDOFF.md "one-paragraph status" is stale.** It references "150/150" tests and "Cal.com booking" as already replaced with native booking. The test count has since grown substantially (619/619 at session 4 close). This is a timestamp mismatch in the handoff document, not a code issue.

4. **VIP step not counted in the "7 touches" headline.** The programme is described as "7 touches + VIP extra." The VIP step (`vip_sameday`, step 2) fires only when `qualityScore === 5`. Confirmed this matches the code. No discrepancy, but worth noting that the VIP step does not have AI-generated copy (it is not in `GENERATABLE_STEP_KEYS`), so it always sends static text.
