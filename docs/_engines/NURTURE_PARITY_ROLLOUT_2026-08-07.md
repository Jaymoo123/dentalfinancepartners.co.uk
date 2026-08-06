# Nurture parity rollout, 2026-08-07

Owner decision: every site reaches Property-level lead nurture, and buyer offers move to READY-stage everywhere (a site is offered immediately only until its nurture stack is armed, then it joins `LEAD_OFFER_READY_GATED_SOURCES`).

## Tier map (audit 2026-08-07)

- **Tier 1 (reference):** Property. Full stack.
- **Tier 2 (port code, then arm):** Dentists, Solicitors, Medical, generalist, contractors-ir35, construction-cis, wills-probate, divorce-finances. Already have sequences + channels + aux-cron + booking + hourly crons; missing contactability/verification, handoff + dossier, inbound email/SMS reply handling, reply-ack, retention, routes (optout, forwarded, events, confirm, handoff, ics, inbound) and retention/reconcile crons.
- **Tier 3 (needs baseline first):** ecommerce, crypto, charities, care, hospitality, pharmacies, startups-tech, digital-agency. Submit-only today. Baseline = the whole Tier-2 subset. Deferred until Tier 2 is armed and stable.

Shared packages are site-agnostic; no refactor needed. Estate-central pieces stay ONLY in Property (notify, offer/claim routes, value scoring, sync, enrich, the offer teaser/send stack). Tier-2 handoff emails carry a plain "Offer to buyers" button linking to the Property-hosted offer confirm page (teaser renders there), which requires the shared `LEAD_NURTURE_TOKEN_SECRET` on every deployment.

## Phases

1. **P1 code port, Tier 2** — pilot Dentists, then 7-site fan-out with the validated recipe. Verification per site: tsc clean, vitest no worse than baseline, no stray Property branding (grep), vercel.json crons added.
2. **P2 deploy round** — all 8 Tier-2 sites + Property (Property carries the offer/claim routes and READY-gating change). Code is inert without env arming.
3. **P3 arming, per site, owner-gated** — env below, canary one site first (Dentists), watch a real lead through verify -> nurture -> READY handoff, then arm the rest. As each site arms: add its source to `LEAD_OFFER_READY_GATED_SOURCES` on the Property deployment.
4. **P4 Tier-3 baseline** — separate wave, after P3 proves out.

## Per-site arming env (Tier 2)

Same names as Property. Per site deployment:
- `CRON_SECRET` (already set where crons exist), `LEAD_NURTURE_TOKEN_SECRET` (**must equal Property's**, offer links verify cross-deployment), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`
- `LEAD_SERVICE_FROM_NAME` / `LEAD_SERVICE_FROM_EMAIL` / `LEAD_SERVICE_REPLY_TO` (site's own brand + verified domain)
- Arming flags: `LEAD_NURTURE_ENABLED`, `LEAD_NURTURE_EMAIL_ENABLED` (SMS/WhatsApp flags stay off unless Twilio is extended)
- `LEAD_RETENTION_PURGE_ENABLED`, `LEAD_RECONCILE_ENABLED` when those crons arm
- Inbound replies: per-site Resend inbound address + `LEAD_RESEND_INBOUND_SECRET` (needs DNS/inbound subdomain per site, owner-gated external setup)

## External gates (owner)

- Resend: verify each site's sending domain (most already send), add inbound subdomains for reply capture per site.
- Twilio: SMS/WhatsApp shared number policy undecided; email-only arming first.
- Deploys are owner-approved per the standing gate; deploy commands in [[vercel_cli_deploy_workflow]] memory.

## Status log

- 2026-08-07: audit complete; offer READY-gating env added (`LEAD_OFFER_READY_GATED_SOURCES`, property always implicit); Dentists pilot port launched.
