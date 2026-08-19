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

## Arming checklist per site (2026-08-19 program; owner-gated, one site at a time)

1. Deploy the site (clean worktree C:/dep at a pushed SHA, `python scripts/check_dependency_closure.py` first). Property must be deployed BEFORE any sibling (pool-intake bridge + shared infra).
2. Live consent check: fetch the deployed enquiry page + privacy policy; the consent text must hit a `consentAllowsSharing` anchor ("will share your details with"). Record pass + timestamp below. Fail = do not arm.
3. Env (site's Vercel project): `CRON_SECRET`, `LEAD_NURTURE_TOKEN_SECRET` (= Property's), `LEAD_INTERNAL_SECRET` only if Property sets one, `RESEND_API_KEY`, `LEAD_SERVICE_FROM_NAME/EMAIL/REPLY_TO` (site brand + verified domain), `TWILIO_ACCOUNT_SID`/`TWILIO_AUTH_TOKEN`/`TWILIO_SMS_FROM=+447723568557` (mirrored from Property; Twilio console unchanged, inbound stays on Property's webhook), then the switches: `LEAD_NURTURE_ENABLED=1`, `LEAD_NURTURE_EMAIL_ENABLED=1`, `LEAD_NURTURE_SMS_ENABLED=1`, `LEAD_RETENTION_PURGE_ENABLED`/`LEAD_RECONCILE_ENABLED` with the crons. `LEAD_RESEND_INBOUND_SECRET` + per-site inbound subdomain is owner-external DNS work and can arm later.
4. Property side: append the site's source to `LEAD_OFFER_READY_GATED_SOURCES`, redeploy Property.
5. Synthetic probe (source='test'): submit -> verify row -> simulated reply -> contactable -> handoff skipped-for-test -> no Telegram ping -> delete rows + dangling web_sessions.lead_id.
6. Abbreviated live walk (real-shaped lead owner controls): submit -> lead_verification row + verify_pass event -> chase SMS from +447723568557 + email with correct branding -> reply YES -> contactable + Telegram ping (correct source, redacted teaser) -> bin. File the evidence table below.
7. If arming WhatsApp: eyeball the approved Meta template bodies for `lead_welcome` / `lead_reminder` first (they are referenced by name in every site's config but live only Meta-side; QA 2026-08-19 could not verify their content or opt-out line).
8. 7-day watch via existing surfaces only (vw_lead_contactability_funnel, Vercel cron logs, lead_nurture_sends); report failures proactively. Then the next site.

Rollback per site, no deploy: unset `LEAD_NURTURE_ENABLED` (fully dormant); remove source from `LEAD_OFFER_READY_GATED_SOURCES` + Property redeploy to leave the pool.

## Status log

- 2026-08-19 (evening): ESTATE DEPLOYED. All 15 in-scope sites live in production at `8ddb0ec7` (clean worktree C:/dep, env-override recipe, --no-wait fleet, zero failed builds; no CI run fired, workflow is content-path-filtered). Pilot walk evidence (Dentists, buyers contained: maratax paused + shadow buyer widened to dentists):
  - Lead 1 `cf5772e8`: live submit -> verify tail wrote lead_verification + verify_pass event + verdict in response -> t0 email really sent, SMS/WhatsApp correctly skipped (unarmed) -> booked via Property /book (gate-wired route) -> contactable, chase halted by the suffix stop-filter (dentists_* sequence inside Property's app) -> AI tier ADVISORY (claude_auto via gateway) -> handed_off -> Telegram ping.
  - Lead 2 `5cb10b07`: real Twilio Lookup ran (creds now on Dentists; reserved-range number correctly INVALID) -> harness-set to unknown -> confirm one-tap INSIDE Dentists -> pool-intake BRIDGE fired (tier STANDARD graded by Property) -> handed_off -> second Telegram ping.
  - STOP mirror: signed Twilio webhook STOP -> lead 2 opted_out + lead 1 mirrored (mirrored_from set), both chases stopped. Suppression on lead 1 lifted with re_consented for the owner's pool step.
  - FIXED during walk: Dentists prod LEAD_NURTURE_TOKEN_SECRET had DRIFTED from Property's (cross-deployment links + bridge silently broken); aligned + redeployed. Check this on every other site at arming.
  - Fleet probes: 13/13 sites accepted a test-flagged probe (is_test=true, zero live sends, zero verify spend); armed Tier-2 enrolled-with-skips, dormant Tier-3 stayed new. Probe rows to be deleted at cleanup.
  - Medical lead 99de492c chase STOPPED in prod (nurture stopped, status restored to new).
  - WALK COMPLETE (owner-confirmed): [Send to pool £85] -> shadow-buyer teaser -> hotmail YES claimed -> [Release] -> release email received. Ledger: lead_offers row claimed+released against test-owner-inbox (is_test, so excluded from /month + invoice). CLEANED UP: walk leads is_test=true (aux reminders blocked by their opted_out events), 13 probe rows deleted, maratax UNPAUSED, shadow buyer back to property-only. Definition of done met end to end on Dentists.
  - STILL OPEN per site before full arming: mirror LEAD_NURTURE_TOKEN_SECRET (check drift like Dentists had), Twilio creds + LEAD_NURTURE_SMS_ENABLED, LEAD_SERVICE_FROM_* / RESEND on Tier-3, live consent curl, LEAD_OFFER_READY_GATED_SOURCES appends on Property, WhatsApp template eyeball. Dentists remaining: owner call on flipping LEAD_NURTURE_SMS_ENABLED=1 (creds already set).
  - Debt noted: aux-cron checks source==='test' but not is_test (covered today by opted_out events); day7_email channels quirk; scarcity lines inherited from accepted reference.
- 2026-08-19 (night): ESTATE FULLY ARMED, owner go ("everything mirrored"). All 14 sibling sites carry Property's creds + switches (LEAD_NURTURE_ENABLED/EMAIL/SMS=1, Twilio x5, token secret, CRON_SECRET, RESEND_API_KEY) with brand FROM names over the verified Property sending domain (owner cancelled per-brand Resend domains: paid-plan limit); reply-to = the central inbound capture address. Property carries LEAD_OFFER_READY_GATED_SOURCES = all 14 sources. 15/15 arming redeploys READY. Armed probe 14/14: live Twilio Lookup on every site (reserved number correctly invalid), email checks live; probes test-flagged then deleted. Dashboard KPI migration 20260819000003 applied staging+prod (test leads excluded from every lead count; also formalises leads.is_test DDL and caught staging up with 20260707000002); owner-confirmed count now correct. REMAINING (deliberately not armed): per-site Resend inbound subdomains (email-reply capture beyond the central address), WhatsApp channel (Meta templates unverified), LEAD_RETENTION_PURGE/RECONCILE flags (mirroring Property, which leaves them unset).
- 2026-08-19 (post-walk, `d07402c6`): two owner findings fixed + estate redeployed (15/15 READY incl console). (1) Console dashboard showed the is_test walk leads: getAllLeads/getLeadsForSite in web-shared adminData now exclude source=test AND is_test at the chokepoint. (2) Operator notifications on all 13 sibling sites still defaulted to the legacy hotmail inbox: lead-routing DEFAULT_NOTIFY_TO now junayd@ashfieldtrading.com estate-wide, matching Property (Property moved 2026-08-12; siblings never followed).

- 2026-08-07: audit complete; offer READY-gating env added (`LEAD_OFFER_READY_GATED_SOURCES`, property always implicit); Dentists pilot port launched.
- 2026-08-06 (recorded 2026-08-19): P1 code port landed for ALL 8 Tier-2 sites in one commit (`6c6e9e78`), not just the pilot.
- 2026-08-19: estate lead-stack parity program (plan `~/.claude/plans/port-property-s-full-lead-vast-gray.md`). Scope: 6 Tier-2 sites wired + 8 Tier-3 baseline; wills-probate + divorce-finances OUT (owner). Landed: shared opt-out mirror (`web-shared/lead-nurture/opt-out.ts`), Property `/api/leads/pool-intake` bridge (sibling promotion -> Telegram grade+ping, fail-open), inbound-SMS lookup estate-wide, promote stop-filter suffix match, `enroll.ts` role=resource guard (root cause of the Medical downloader chase, lead 99de492c), Dentists pilot wiring (verify tail at submit, bridge, anon-fallback removal, brand-safe email defaults), consent-anchor drift test. Gates green (Property 47f/1238t, web-shared 15f/374t, Dentists 16f/435t; tsc + next build clean). OPEN: 99de492c prod stop blocked by tool permissions (owner action before 2026-08-20 09:00 UTC); Tier-2 fan-out x5 + Tier-3 baseline in progress; deploys + arming owner-gated.
