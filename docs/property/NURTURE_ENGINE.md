# Property nurture engine (data & growth program, Phase 3)

The nurture engine turns the multi-visit reality (only returning visitors convert)
into a system: an opt-in marketing list, a scheduled email drip, and an engagement
loop. It is **separate from the lead pipeline** (`leads` table / enquiry consent).
Subscribers have their **own marketing consent** and a one-click unsubscribe.

This is built and deployed, but it stays **dormant until you set the env vars and
the Resend webhook below**. With nothing configured it does nothing (the cron
refuses to run without `CRON_SECRET`, and the subscribe form returns "not
configured"), so there is no risk of accidental sends.

## What ships

| Piece | Where |
|---|---|
| `subscribers`, `nurture_state`, `nurture_sends` tables + `vw_subscriber_health`, `vw_nurture_step_funnel` | migration `20260608000007_nurture_engine.sql` (applied to prod) |
| Opt-in form (engaged-visitor surface: end of every blog post) | `components/forms/SubscribeForm.tsx` |
| Opt-in capture | `POST /api/subscribe` |
| Drip content (5-step "property_updates" sequence) | `lib/nurture/sequence.ts` |
| Branded marketing email shell | `lib/emails/template.ts` |
| Scheduler (Vercel Cron, daily 09:00 UTC) | `GET /api/nurture/send` + `vercel.json` `crons` |
| Engagement webhook (opens/clicks/bounces/complaints) | `POST /api/nurture/events` |
| One-click unsubscribe (RFC 8058) | `/api/unsubscribe?token=...` |

The drip: **welcome (immediate) → Section 24 reducer rising to 22% in 2027 (+3d)
→ incorporation question (+5d) → CGT when you sell (+6d) → FA 2026 allowances +
55p mileage (+7d)**. Every email is general information (not advice), routes to a
free review, and carries an unsubscribe link.

## Setup (you / one-time)

### 1. Vercel env vars (Property project → Settings → Environment Variables, Production)

Already set (reused): `RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`.

Add these:

| Var | Value | Purpose |
|---|---|---|
| `CRON_SECRET` | a long random string | the cron refuses to run without it; Vercel sends it automatically to the cron path. **Without this, nothing sends.** |
| `NURTURE_WEBHOOK_SECRET` | a long random string | authenticates the Resend webhook (carried in the URL). |
| `NURTURE_FROM_EMAIL` | `updates@propertytaxpartners.co.uk` (default) | marketing from-address. Must be on a Resend-verified domain. `propertytaxpartners.co.uk` is already verified (leads@ works), so `updates@` on the same domain needs no extra DNS. |
| `NURTURE_FROM_NAME` | `Property Tax Partners` (default) | sender display name. |
| `NURTURE_REPLY_TO` | `hello@propertytaxpartners.co.uk` (default) | where subscriber **replies** land. Forward this to your own inbox. |

### Email routing (who gets what)

This is deliberate and kept separate from the lead pipeline:

- **Nurture / welcome emails** go **to the subscriber only** (no CC). Replies go to
  `NURTURE_REPLY_TO` (the hello@ inbox you forward to yourself), **never the
  partner firm**. Subscribing writes to the `subscribers` table, which does **not**
  fire the lead-notification trigger, so an opt-in never emails anyone internally.
- **The partner firm (Reflex) is CC'd only on genuine lead enquiries** (the
  existing `/api/leads/notify` flow, `leads` table). That is the intended handoff
  and is untouched by the nurture engine.

So: set the hello@ (and `updates@`) forwarding to **your** inbox. The partner only
ever sees real leads, not subscribers.

Generate a secret: `openssl rand -hex 24` (or any random 30+ char string).

### 2. Resend webhook (so opens/clicks/bounces feed the dashboard)

Resend → Webhooks → Add endpoint:

- **URL:** `https://www.propertytaxpartners.co.uk/api/nurture/events?key=YOUR_NURTURE_WEBHOOK_SECRET`
- **Events:** `email.opened`, `email.clicked`, `email.bounced`, `email.complained`

Bounces and complaints automatically suppress the subscriber (status → bounced /
complained) and pause their drip, which keeps the list clean and the sending
reputation healthy.

### 3. Fix the hello@ bounce (MX forwarding)

A lead reported that emailing `hello@propertytaxpartners.co.uk` bounced. Fix it
with email **forwarding** (no mailbox needed) at the DNS level. Simplest route:

- Use a free forwarder such as **ImprovMX** (or your registrar's built-in email
  forwarding if it has one):
  1. Add the forwarder's MX records to `propertytaxpartners.co.uk`
     (ImprovMX: `mx1.improvmx.com` priority 10, `mx2.improvmx.com` priority 20).
  2. Create an alias: `hello@propertytaxpartners.co.uk` → an inbox you already
     read.
- **Caution:** the domain currently **sends** via Resend (SPF/DKIM). Adding
  *receiving* MX records does not affect sending, but do not remove/replace the
  existing SPF TXT record. If your registrar already has MX records, check with
  whoever manages DNS before changing them.

> This is the only piece that touches DNS at the registrar, so it is yours to do.
> The app code does not need it; it just stops lost leads.

## How it works / safety

- **Idempotent sends.** Each (subscriber, step) is claimed in `nurture_sends`
  before Resend is called, so a cron overlap or retry never double-sends. A
  transient send failure releases the claim and retries next run.
- **Consent.** The opt-in stores its own marketing consent text + timestamp;
  the lead-enquiry consent is never reused. Every email has unsubscribe +
  List-Unsubscribe one-click headers.
- **PII lockdown.** `subscribers` (holds emails) has RLS enabled with **no
  policies** — only the service role (server routes + dashboard) can read it.
  The anon key cannot.
- **Send-dormant by default.** With no `CRON_SECRET` set, **no email is sent at
  all**: the cron refuses to run, and the subscribe form records the opt-in but
  skips the immediate welcome. Setting `CRON_SECRET` is your explicit "go": after
  it, the next cron run sends each opted-in subscriber's pending step (starting at
  the welcome). So opt-ins are never lost, and nothing mails until you enable it.

## Test it (after the env is set)

1. Subscribe with your own email via the form at the bottom of any blog post.
   You should get the **welcome** email within a minute.
2. Manually trigger the scheduler (it normally runs daily):
   `curl "https://www.propertytaxpartners.co.uk/api/nurture/send?key=YOUR_CRON_SECRET"`
   → returns `{ "ok": true, "processed": N, "sent": N }`.
3. Click the link / open the email → check `vw_nurture_step_funnel` shows
   opened/clicked.
4. Click unsubscribe → confirm `subscribers.status = unsubscribed` and no further
   sends.

## Dashboard

`vw_subscriber_health` (list health by status) and `vw_nurture_step_funnel`
(sent/opened/clicked/bounced per step) are live now. The Analytics dashboard
panels that read them ship with Phase 4 (lead intelligence), alongside the
lead-intent mix.
