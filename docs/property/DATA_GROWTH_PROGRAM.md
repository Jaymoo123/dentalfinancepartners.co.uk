# Property data & growth program — state

Plan: `.claude/plans/on-the-homepage-we-kind-umbrella.md`. This file tracks
delivery. Built local-first, deployed phase by phase to the Property project
(`prj_Di0U5vYZVPlkm7xcA3p9il9gyDzU`), branch `property-calculators-and-geo`.

## Shipped + deployed (2026-06-08)

| Phase | Commit | What |
|---|---|---|
| 1a | `69b6e62d` | web_sessions city/region/timezone; real-user Web Vitals (`@vercel/speed-insights` + first-party `web_vital`); Clarity cohort tags (`visitor_id`/`visit_class`/`topic`) |
| 2 | `f6cc7d90` | `vw_channel_conversion_geo` + `vw_visits_to_conversion`; "Acquisition by value" + "Visits to conversion" panels on Overview |
| 1b | `e41a41f4` | Vercel BotID (`botid`) server verdict on `/api/track` (fail-open) + `botid_verified` tri-state |
| 3 | `7ebbca58` | Nurture engine: `subscribers`/`nurture_state`/`nurture_sends` (RLS-locked), SubscribeForm (blog footer), `/api/subscribe`, 5-step drip, `/api/nurture/send` cron, `/api/nurture/events` webhook, `/api/unsubscribe`. See `NURTURE_ENGINE.md` |
| 4 | `12bb6f58` | Lead intelligence: `lib/ai.ts` (AI Gateway Opus classifier) + `lib/companies-house.ts`; `lead_enrichment` (RLS) + `vw_lead_intent_mix`; `/api/leads/enrich` + `leads_to_enrich` trigger (installed); "What leads actually want" + "Nurture engine" dashboard panels |

Migrations applied to prod: `20260608000005`..`000008`. The `leads_to_enrich`
trigger (`000009`) is installed live (mirrors the notify endpoint+secret).

### Key safety facts (verified)
- **PII lockdown proven**: `subscribers` + `lead_enrichment` have RLS enabled, no
  policies. Canary test confirmed the public anon key reads `[]` while the
  superuser sees the row. Service-role-only.
- **Send-dormant by default**: no email sends until `CRON_SECRET` is set
  (subscribe records the opt-in but skips the welcome; cron refuses to run).
- **Email routing** ([[email_routing_partner_vs_subscriber]]): nurture emails go
  to the subscriber only, `replyTo` = `hello@` (forward to user inbox). Partner
  CC is leads-only. Never CC the partner on subscriber/nurture/alerts.

## Operator config still needed (unblocks activation)
Vercel → Property project env (Production):
- `NEXT_PUBLIC_CLARITY_ID` (Clarity replays) · `CRON_SECRET` (enables nurture
  sending) · `NURTURE_WEBHOOK_SECRET` (Resend webhook) · `COMPANIES_HOUSE_API_KEY`
  (CH enrichment) · `NURTURE_FROM_EMAIL`/`NURTURE_REPLY_TO` (optional; defaults fine)
- Enable **AI Gateway** on the project (lead classification; OIDC, no key)
- Resend webhook → `https://www.propertytaxpartners.co.uk/api/nurture/events?key=<NURTURE_WEBHOOK_SECRET>` (opened/clicked/bounced/complained)
- **MX forwarding** for `hello@propertytaxpartners.co.uk` → user inbox (fixes the
  bounced-lead; catches subscriber replies)

## Remaining (not started)
- **Phase 5**: Edge Config experiment flags (toggle without redeploy); data-PR /
  GEO asset (aggregate Companies House + free Land Registry Price Paid / ONS into
  a faceless landlord-incorporation trends report).
- **8 outside-the-box plays** (plan §Outside-the-box): proactive alerts to the
  user inbox; AI-citation/GEO (llms.txt + LLM-extractable pages + "AI citations"
  panel); embed distribution; value-routing of hot leads; Thompson-sampling
  bandit experiments; incorporation hero tool + programmatic local pages;
  network-aware (reuse across the 5 sites); AI instant-qualification at capture.
- Open decision (paused 2026-06-08): execution style for the rest — parallelize
  content/GEO/PR plays via Opus subagents vs keep serial. User to steer.

## Everything reusable across the 5-site network (site-keyed). Build once, roll out.
