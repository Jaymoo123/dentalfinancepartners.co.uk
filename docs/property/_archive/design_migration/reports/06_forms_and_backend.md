# Report 06 — Lead capture and backend wiring

**Brief:** map every capture surface and backend entrypoint end to end, and specify exactly
what must be reconnected after the design port.
**Written:** 2026-08-22. **Method:** read the monorepo code and the designer snapshot directly.
Every claim below is **VERIFIED** (I opened the file) unless labelled **INFERRED**.
No test lead was sent anywhere. Nothing outside `tmp/design_migration/` was edited.

---

## 0. Headline

**The reconnection risk is much smaller than the 22-stub number suggests, and the real danger
is the opposite of what it looks like.**

1. All 22 quarantined entrypoints are **ours already and intact**. The designer never modified
   a single one of them beyond renaming it to `.disabled` and dropping a 503 stub in its place.
   Their whole redesign posts to exactly **five** URLs, four of which are ours and unchanged.
2. The only endpoint their redesign calls that **does not exist in our monorepo** is
   **`POST /api/resources/deliver`**, reached from `ResourceGate.tsx`.
3. **`ResourceGate` is the hard flag.** We deleted it, its lazy wrapper, `ExcelPreview` and
   `/api/resources/deliver` on 2026-08-16 (`5c156c51`) as a dead surface that had been
   inserting **straight into PostgREST, bypassing `/api/leads/submit`** for two months after it
   was already unreachable. The designer's snapshot predates that deletion, so their tree still
   contains all of it, freshly restyled. **Porting it would resurrect the only
   direct-to-Supabase lead path on the site.** See §8.
4. The second-order risk is quieter: the designer edited **local copies** of `MiniCapture.tsx`,
   `ResultGateModal.tsx`, `CalcResultCta.tsx` and `capture-steps.ts`. Since the snapshot we
   **extracted all of those into `packages/web-shared/leads/`** (`ec38f821`) and left 24-49 line
   wrappers behind. A file-for-file port would silently replace a wrapper with a 750-line fork
   and take Property off the shared conversion stack. See §9.

Decision needed from the owner: **do we adopt the designer's `ResultGate` soft-gate on the five
bespoke calculators, and their `LeadCTAPanel` (embedded `LeadForm`) on ~20 routes?** Both are
conversion changes, not design changes. Recommendation and blast radius in §7.

---

## 1. Where our docs are wrong

I was asked to verify the five lead docs against code. Three are stale in ways that matter.

| Doc | Claim | Reality |
|---|---|---|
| `docs/Property/LEAD_CAPTURE_MAP.md:16` | `ResourceGate` is a live "deliberate exception", direct insert, "leave it alone" | **DELETED 2026-08-16** (`5c156c51`, `-354` lines + `-37` for `ResourceGateLazy` + the `/api/resources/deliver` route). This exact stale docstring is what caused the false "revenue outage" report the commit message describes. Fix the doc. |
| `docs/Property/LEAD_CAPTURE_MAP.md:14` | `MiniCapture` implementation lives at `src/components/forms/MiniCapture.tsx` | That file is now a **42-line wrapper** (`Property/web/src/components/forms/MiniCapture.tsx:32-42`). The implementation is `packages/web-shared/leads/MiniCapture.tsx` (707 lines). Same for `ResultGateModal` (49-line wrapper) and `CalcResultCta` (40-line wrapper). |
| `docs/Property/LEAD_CAPTURE_MAP.md:24` | `exit_intent` is a live placement ("modal when leaving a blog/calculator page") | **Removed 2026-07-09**, `Property/web/src/app/layout.tsx:106` ("ExitIntentModal removed 2026-07-09: inert since 06-29"). The `form_id` survives only in `role-labels.ts:33-34`, `deploy-watch.ts:150-151` and `value-score.ts:86-87` as historical keys. |
| `LEAD_CAPTURE_MAP.md` placement inventory | 9 surfaces | Missing `PageResultCta`, `EmbedCta`, `StickyCTA`, `DeepScrollModal` (CTA-only, no `form_id`, but they are capture surfaces in the funnel sense and carry `data-cta-goal="form"`). |

`LEAD_CAPTURE_MULTISTEP.md`, `LEAD_DETAIL_CAPTURE.md`, `LEAD_NURTURE_SYSTEM.md` and
`NURTURE_ENGINE.md`: I did not find contradictions with code in the areas this brief covers,
but I read them only for cross-reference, not line by line. **INFERRED: not verified clean.**

---

## 2. Every lead capture surface in the monorepo (VERIFIED)

Everything with a `form_id` posts to **one endpoint**: `POST /api/leads/submit`, via
`Property/web/src/lib/leads/submit-client.ts:58`. There is no second submission path.

### 2a. Full-form surface

| | |
|---|---|
| **Component** | `LeadForm` — `Property/web/src/components/forms/LeadForm.tsx` (441 lines) |
| **Routes** | `/contact` (`app/contact/page.tsx:107`), `/` (`app/page.tsx:760`), 10 blog category hubs (`app/blog/*/page.tsx`), 6 calculator pages (`app/calculators/*/page.tsx`, anchor `id="get-expert-help"`), `/property-tax-rates:445`-ish, `/research/landlord-tax-index`, and every blog article via `components/blog/BlogPostRenderer.tsx:302` |
| **Fields (7 required + 1 conditional)** | `role` (select, `LeadForm.tsx:200`), `roleDetail` (only when `role === "Other"`, `:229`), `fullName` (`:252`), `email` (`:276`), `phone` (`:299`), `situation` (textarea, `:323`), `prompted` (`:361`), `callGoal` (`:384`) |
| **Hidden** | `sourceUrl` (`:191`), honeypot `enquiry_ref` (`:194`, off-screen, non-semantic name deliberately) |
| **Validation** | `LeadForm.tsx:54-84` — name ≥2, email regex, phone ≥10 digits and charset, role required, plus `validateEnquiryParts()` from `lib/leads/enquiry-message.ts` |
| **Payload** | `LeadForm.tsx:107-126`. `message` is composed from the three parts by `composeEnquiryMessage()`. `extras` = `buildRoleExtras(role, roleDetail)` |
| **`source`** | `niche.content_strategy.source_identifier` (`LeadForm.tsx:113`) — the `leads.source` column, `"property"` |
| **Success** | `ft.onLead()` (first-party conversion + `setConverted()`), gtag `generate_lead`, `setBookingNudge(bookingToken)`, then if `redirectOnSuccess` a 800 ms delayed `router.push(buildThankYouUrl(bookingToken, returnPath))` → `/thank-you`. If `redirectOnSuccess={false}` it shows the inline emerald panel at `:420-426`. If `verify.phone === "invalid"` it stays put and asks for the number again (`:152-157`). |
| **No `form_id` in extras** | `LeadForm` does **not** send `extras.form_id`. Its `form_id` is emitted only as the analytics form name `"lead_form"` (`:44`). **INFERRED:** attribution for `lead_form` therefore depends on `web_events`, not on the lead row. |

### 2b. Shared mini-form surfaces (all seven route through one component)

Implementation: `packages/web-shared/leads/MiniCapture.tsx`.
Property adapter: `Property/web/src/components/forms/MiniCapture.tsx` (injects `siteConfig`,
`submitLead = submitPropertyLead`, experiment callbacks).

Two-step when `NEXT_PUBLIC_MINIFORMS_MULTISTEP` is on (`miniformsMultistepEnabled()`):
step 1 = `role` + conditional `roleDetail` + `message`; step 2 = `full_name` + `email` + `phone`.
Single-step fallback is `full_name`/`email`/`phone`/`message` (`MiniCapture.tsx:628-703`).
Honeypot `enquiry_ref` on both (`:470`, `:629`). Payload built at `:317-332` (multi) and
`:387-402` (single). Message floors: `MINI_MESSAGE_MIN_CHARS=20`, `MINI_MESSAGE_MIN_WORDS=4`
(`packages/web-shared/leads/capture-steps.ts:16-17`).

| `form_id` | Wrapper | Rendered on | `messagePrefix` | Post-submit |
|---|---|---|---|---|
| `inline_mini` | `components/blog/InlineMiniLeadForm.tsx:13` | mid-article split, `BlogPostRenderer.tsx:276` | `[Inline mini-form (topic)]` | `redirect` → `/thank-you` |
| `resource_block` | `components/resources/GateOrForm.tsx:20` | `BlogPostRenderer.tsx:257,264`, `CalculatorPageResources.tsx` | `[Resource block: topic]` | `redirect` |
| `calc_result` | `components/calculators/CalcResultCta.tsx` → `packages/web-shared/leads/CalcResultCta.tsx:27` | `CalculatorClient.tsx`, `IncorporationCostCalculator`, `MTDCheckerCalculator`, `PortfolioProfitabilityCalculator`, `Section24Calculator`, `PremiumCalculator.tsx:665` | `[Calculator result: campaign]` | `redirect` |
| `calc_result_gate` | `components/calculators/ResultGateModal.tsx` → `packages/web-shared/leads/ResultGateModal.tsx:77` | modal from `PremiumCalculator.tsx:672` | `[Result gate: campaign]` | **inline only** — `onSuccess` reveals the result after 1800 ms (`ResultGateModal.tsx:85`). Must never redirect. |
| `mobile_tool` | `packages/web-shared/leads/MobileToolSlot.tsx:30` via `components/calculators/premium/PremiumUpgrade.tsx:92` | mobile fallback under premium tools | `[Mobile tool: topicKey]` | `redirect` |
| `exit_intent` / `exit_intent_form` | — | **retired 2026-07-09** | — | — |

`extras.form_id` **is** set on the multi-step path (`MiniCapture.tsx:331`) and **is not** on the
single-step path (`:401` sends only `{ qa: true }` when in QA mode). **VERIFIED.** Worth a
follow-up: with the multistep flag off, `resource_block`/`inline_mini` leads lose row-level
attribution.

### 2c. Email-only surface

| | |
|---|---|
| **Component** | `SpecialistWidget` — `components/support/SpecialistWidget.tsx` (811 lines) |
| **Route** | site-wide, mounted in `app/layout.tsx`; no-ops in `/embed` and `/admin` via `useIntentContext()` |
| **Fields** | single flow: `email` + `question`. Multi flow: step 1 `role` + `roleDetail` + `question`, step 2 `email`. |
| **Payload** | `:380-405` (single), `:459-486` (multi). `full_name: ""`, `phone: ""`, `captureMode: "email_only"`, `extras.capture_channel = "assistant"`, `extras.trigger`, and on the multi path `extras.form_id = "specialist_widget"` |
| **Server effect** | `submit/route.ts:85` relaxes validation to email + message; `routePrimarySequence()` routes it into the **detail-capture** sequence rather than contactability, because name/phone are missing |
| **Success** | in-thread confirmation only, no redirect (`:414`, `:492`) |

### 2d. Post-lead completion surface

`DetailsForm` — `components/forms/DetailsForm.tsx`, rendered by `app/complete/page.tsx`.
Posts `POST /api/leads/complete` (`:90`) with `{ token, enquiry_ref, full_name?, phone? }`.
Only renders the missing field(s); **never** email, never message (`:83-87`).
Success states: `success` (shows a `/book?t=<bookingToken>` link, `:137`), `partial`
(still missing the other field), `idle + phoneError` when `invalidPhone` comes back (`:103-111`).

`BookingPicker` — `components/forms/BookingPicker.tsx`, on `/book` and `/thank-you`.
Fires `POST /api/leads/booking-viewed` (`:37`) and `POST /api/leads/book` (`:51`).

### 2e. Link-only CTAs (no form, but they are the funnel's form-bound clicks)

| Component | File | Target | Attributes |
|---|---|---|---|
| `PageResultCta` | `components/calculators/PageResultCta.tsx:13-21` | `/contact` | `data-cta="calc_result_{campaign}"`, `data-cta-placement="calc_result"`, `data-cta-goal="form"` |
| `EmbedCta` | `components/embed/EmbedCta.tsx:9` | absolute `https://www.propertytaxpartners.co.uk/contact?utm_source=partner-embed&utm_medium=iframe&utm_campaign={campaign}` | `target="_blank" rel="noopener"` |
| `StickyCTA` | `components/ui/StickyCTA.tsx:100-113` | `getActiveCta(niche).sticky.href` or personalised offer href | `data-cta="sticky_cta"`, `data-cta-placement="sticky"`, `data-cta-variant={niche.cta.variant}`, `data-cta-goal="form"` when href starts `/contact`. Rendered on `/` (`app/page.tsx:298`). Suppressed on `/pricing` in packages mode. |
| `DeepScrollModal` | `components/intent/DeepScrollModal.tsx:106-118` | `offer.href` | `data-cta="deep_scroll_modal"`, `data-cta="deep_scroll_close"`, `data-cta-goal` conditional. Mounted in `app/layout.tsx`. |
| `PremiumUpgrade` | `components/calculators/premium/PremiumUpgrade.tsx:92` | renders `MobileToolSlot` (a `MiniCapture`) on mobile | no link variant in our tree |

### 2f. LIVE BUG confirmed on our side

`components/blog/BlogPostRenderer.tsx:292` renders the article's primary conversion point as
`className="mt-16 bg-slate-900 p-8 sm:p-10 text-white scroll-mt-24"` and puts a bare
`<LeadForm redirectOnSuccess={false} .../>` inside it at `:302`. Every `LeadForm` label is
`text-slate-900` (`LeadForm.tsx:197, 226, 249, 273, 296, 320, 358, 381`).
**Every blog article's main form has invisible field labels, in production, today.**
This is CONTEXT §6.1, and it reproduces in our tree. It is a one-class fix and does not need
the port. See checklist item **R1**.

---

## 3. Every API route (VERIFIED)

28 route files under `Property/web/src/app/api/`. The 22 the designer quarantined are marked ⓠ.

### Crons (all `CRON_SECRET` bearer, `timingSafeEqual`, `dynamic = "force-dynamic"`, `nodejs`)

Schedules from `Property/web/vercel.json` (the only `crons` block in the project; the other
match is a comment at `src/instrumentation.ts:4`).

| Route | Schedule | Owner-notifying? | Env | Tables |
|---|---|---|---|---|
| ⓠ `cron/lead-nurture` | `0 * * * *` | **YES, indirectly** — delegates to `runLeadNurtureCron` + `runNurtureGuardrails`; guardrails email on breach-set change | `CRON_SECRET`, `HEARTBEAT_LEAD_NURTURE`, `LEAD_NURTURE_AUTOPAUSE_ENABLED` | via shared engine |
| ⓠ `cron/lead-nurture-digest` | `0 7 * * *` | **NO longer sends** — `5c156c51` made `runNurtureDigest()` log-only. Cron + `lastDigestRunAt` stamping kept because a frozen stamp is a watched signal. | `CRON_SECRET`, `HEARTBEAT_DIGEST` | via lib |
| ⓠ `cron/lead-retention` | `30 3 * * *` | no | `CRON_SECRET`, `LEAD_RETENTION_PURGE_ENABLED`, `HEARTBEAT_RETENTION` | via `runLeadRetentionPurge` |
| ⓠ `cron/lead-reconcile` | `30 4 * * *` | no | `CRON_SECRET`, `LEAD_RECONCILE_ENABLED`, `HEARTBEAT_RECONCILE` | `leads`, `lead_nurture_state`, calls `enrollLead` |
| ⓠ `cron/deploy-watch` | `30 7 * * *` | **YES** — Resend `.emails.send` at `route.ts:251`, to `resolveLeadTo("property")`, one email per due gate | `CRON_SECRET`, `HEARTBEAT_DEPLOY_WATCH`, `RESEND_API_KEY` | `deploy_watch`, `web_events` |
| `cron/lead-raw-batch` | `0 8 * * *` | **YES** — Telegram `notifyRawEligible()` (`:67`) primary; Resend fallback (`:76-87`) only if the Telegram prompt fails | `CRON_SECRET`, `HEARTBEAT_LEAD_RAW_BATCH`, `RESEND_API_KEY` | via `raw-supply`/`bot-notify` |

`cron/lead-raw-batch` **does not exist in the designer snapshot at all** — it postdates it, and
their `vercel.json` has only five cron entries.

**Standing constraint (CLAUDE.md, `standard_terms` §7): none of these cadences, thresholds or
recipients may change without owner sign-off.** The port must leave `vercel.json`'s `crons`
array byte-identical to ours. See checklist item **C1**.

### Lead + ops routes

| Route | Method | Auth | Called by |
|---|---|---|---|
| ⓠ `leads/submit` | POST | none (public); honeypot tag-only | **every capture surface**, via `submit-client.ts:58` |
| ⓠ `leads/complete` | POST | signed lead token, `intent="profile"` | `DetailsForm.tsx:90` |
| ⓠ `leads/book` | POST | signed lead token, `intent="book"` | `BookingPicker.tsx:51` |
| ⓠ `leads/booking-viewed` | POST | signed lead token, `intent="book"` | `BookingPicker.tsx:37` |
| ⓠ `leads/notify` | GET/POST | `x-webhook-secret` = `LEADS_NOTIFY_SECRET`\|`LEADS_SYNC_SECRET` | **pg_net trigger** `leads_to_email_trg` |
| ⓠ `leads/enrich` | GET/POST | `x-webhook-secret` = `LEADS_ENRICH_SECRET`\|… | **pg_net trigger** (`20260608000009_leads_to_enrich_webhook.sql`) |
| `leads/sync` | GET/POST | `x-webhook-secret` = `LEADS_SYNC_SECRET` | **pg_net trigger** `leads_to_sheets_trg`. **DORMANT BY DESIGN** — its own header says do not arm until the privacy policy discloses the processor and a purge path exists. |
| ⓠ `leads/events` | POST | Svix, `LEAD_RESEND_WEBHOOK_SECRET` | Resend engagement webhook. **The only one of the 22 whose `.disabled` copy differs from ours (2 lines).** |
| ⓠ `leads/inbound/email` | POST | Svix, `LEAD_RESEND_INBOUND_SECRET` | Resend inbound |
| ⓠ `leads/inbound/twilio` | POST | Twilio HMAC-SHA1, `TWILIO_AUTH_TOKEN` | Twilio |
| ⓠ `leads/confirm/[token]` | GET/POST | signed token `confirm` | nurture email |
| ⓠ `leads/optout/[token]` | GET/POST | signed token `optout` | RFC 8058 one-click unsubscribe |
| ⓠ `leads/forwarded/[token]` | GET/POST | signed token `forwarded` | operator email |
| ⓠ `leads/ics` | GET | signed token `book` via `?t=` | booking confirmation |
| ⓠ `leads/enroll` | POST | `x-internal-token` | internal only |
| ⓠ `leads/generate-sequence` | POST | `x-internal-token` | `submit/route.ts:338` via `after()` |
| ⓠ `leads/handoff/resend` | POST | `x-internal-token` | internal only |
| `leads/pool-intake` | POST | `x-internal-token` | sibling sites; fires `notifyLeadVerified` to Telegram |
| `leads/claim/[token]` | GET/POST | offer token + DB status | buyer claim; `notifyClaimHeld` to Telegram |
| `leads/offer/[token]` | GET/POST | signed token `offer`, 48h TTL | owner one-click from notify email |
| `telegram/webhook` | POST | `X-Telegram-Bot-Api-Secret-Token` + chat-id allowlist | Telegram |
| `track` | POST | none (public beacon) | `web-shared/analytics` |
| `og` | GET | none | OG images |

**Our versions of all 22 quarantined routes are intact and current.** CONTEXT §5 already
verified 21 of 22 byte-identical to what we sent the designer; I confirmed each file exists and
compiles against the real shared package by reading it. Nothing needs recovering from the
snapshot. `route.ts.disabled` and `page.tsx.disabled` must be **discarded**, not merged.

---

## 4. The full post-submit chain for one real lead (VERIFIED)

```
[1] Browser
    submitPropertyLead()                    Property/web/src/lib/leads/submit-client.ts:58
        POST /api/leads/submit  { full_name, email, phone, role, message, source,
                                  source_url, submitted_at, consent_*, visitor_id,
                                  session_id, extras, captureMode?, enquiry_ref }

[2] Server chokepoint                        src/app/api/leads/submit/route.ts
    :117  honeypot -> extras.honeypot = true (TAG ONLY, lead still proceeds)
    :125  validate (relaxed when captureMode === "email_only")
    :152  dedupe: exact source+email within 24h, then a 50-row scan matching on
          normalizeEmailForDedupe / phoneDedupeKey  (fixes the 2026-08-19 plus-alias dupe)
    :242  merge path: append message, adopt non-empty name/phone, reopen if
          status was closed/unreachable + insert lead_contact_events.re_consented
    :255  else adminInsert("leads", baseRow)   <- SERVICE ROLE

[3] DB triggers on INSERT INTO public.leads (pg_net, all AFTER INSERT)
    leads_to_email_trg   -> POST /api/leads/notify   supabase/migrations/20260601000000_*
    leads_to_sheets_trg  -> POST /api/leads/sync     supabase/migrations/20260529000000_*  (DORMANT)
    leads_to_enrich      -> POST /api/leads/enrich   supabase/migrations/20260608000009_*
    stitch_lead_to_session_trg                        supabase/migrations/20260606000001_*

[4] Verification (in-request, best-effort)   submit/route.ts:283-311
    verifyLead()  -> Twilio Lookup + ZeroBounce   src/lib/leads/verify.ts
    -> upsert lead_verification (onConflict lead_id)
    -> recordLeadContactEvent(verify_pass | verify_fail)
    SPENDER: one Twilio Lookup + one ZeroBounce credit per call.
    skip_verification honoured ONLY for a test lead (:280).

[5] Nurture enrolment (brand-new inserts only) submit/route.ts:321-355
    routePrimarySequence(lead)   src/config/lead-nurture.ts
      full form   -> contactability
      email_only  -> detail-capture
    enrollLead()                 src/lib/leads/enroll.ts   (fires the INSTANT touch)
    then after(): POST /api/leads/generate-sequence with x-internal-token (AI copy,
    contactability only, only when copyAiEnabled())

[6] Owner email                              src/app/api/leads/notify/route.ts
    getResend() + getFromAddress()           src/lib/resend.ts
    resolveLeadTo("property") -> LEADS_NOTIFY_TO_PROPERTY | junayd@ashfieldtrading.com
    resolveLeadCc("property") -> [] because "property" is in
      DEFAULT_CC_EXCLUDED_SOURCES = "property,test"   src/lib/lead-routing.ts:26
    body from buildLeadHtml/buildLeadText   src/lib/leads/notify-email.ts
    optional buyer-offer teaser block + /api/leads/offer/<token> action link

[7] Telegram                                 src/lib/leads/bot-notify.ts
    NOT fired at submit. Fires when the lead is promoted/verified:
    contactability.ts:38 -> notifyLeadVerified()  (grade + tier picker keyboard)
    also: pool-intake, claim/[token], inbound/email, cron/lead-raw-batch, aux-cron

[8] Google Sheets                            src/lib/leads/google-sheets.ts
    appendLeadRow() from /api/leads/sync only. DORMANT: sheetsConfigured() is false.
```

**Return value the UI depends on:** `{ success, leadId, bookingToken, verify: {phone, email} }`
(`submit/route.ts:368-373`). `bookingToken` is minted by `mintLeadToken(leadId, "book")` and is
what powers `/thank-you`'s slot picker and `setBookingNudge`. If `LEAD_NURTURE_TOKEN_SECRET` is
unset, `bookingToken` is silently omitted and the thank-you page just has no picker (`:364`).

---

## 5. What the designer's redesign actually posts to

Exhaustive grep of `tmp/design_migration/Property_zip/web/src` for `fetch("/api/...")`:

| Their file:line | Endpoint | Exists in our monorepo? |
|---|---|---|
| `lib/leads/submit-client.ts:57` | `POST /api/leads/submit` | YES, identical contract |
| `components/forms/DetailsForm.tsx:90` | `POST /api/leads/complete` | YES, identical contract |
| `components/forms/BookingPicker.tsx:51` | `POST /api/leads/book` | YES, identical contract |
| `components/forms/BookingPicker.tsx:37` | `POST /api/leads/booking-viewed` | YES, identical contract |
| `components/resources/ResourceGate.tsx:162` | `POST /api/resources/deliver` | **NO — deleted 2026-08-16** |

That is the whole list. **`submit-client.ts` is byte-identical between the two trees except for
its header comment**, so `PropertyLeadPayload`, `PropertyLeadResult`, the `enquiry_ref` honeypot
passthrough and the `needsCheck` derivation all survive the port untouched.

---

## 6. Reconnection worklist: endpoints that are missing or have a different contract

**Only one true miss, but three shape mismatches.**

1. **`POST /api/resources/deliver` — MISSING, and must stay missing.**
   Reached from their `ResourceGate.tsx:162`. Their route file is
   `Property_zip/web/src/app/api/resources/deliver/route.ts` (not quarantined, because it has no
   `lead-nurture` import). Deleted on our side in `5c156c51`. **Do not port the route and do not
   port its caller.** See §8.

2. **`ResourceGate` bypasses `/api/leads/submit` entirely.**
   Their `ResourceGate.tsx:137` calls `submitLead(payload, supabaseUrl, supabaseKey)` — the old
   shared **direct-to-Supabase insert**, with `role: "resource"`, `full_name: ""`, `phone: ""`
   and a real consent checkbox. That signature does not exist in our tree any more, and
   `submit/route.ts:13-16` states in terms that this was the last direct inserter and it is
   retired. Porting it would also ship client-side Supabase config, which we currently do not
   ship at all.

3. **`MiniCapture` / `ResultGateModal` / `CalcResultCta` / `capture-steps` are wrappers now.**
   Their edits target local implementations that no longer exist here. Contract detail: the
   shared `MiniCapture` **requires** two extra props, `siteConfig: MiniCaptureConfig` and
   `submitLead: MiniCaptureSubmitFn` (`packages/web-shared/leads/MiniCapture.tsx:122-123`).
   Any designer component that renders `<MiniCapture …>` directly will not typecheck.
   `ResultGateModal` additionally now takes `topicCtaCopy` and the same two props
   (`packages/web-shared/leads/ResultGateModal.tsx:21-27`); our Property wrapper supplies them
   and resolves `topicCtaCopy` from `deriveTopic(pathname)` — **the designer's version has no
   topic-aware heading, so their file is a downgrade, not an upgrade.**

4. **`vercel.json`.** Theirs (`Property_zip/web/vercel.json`) has the snapshot-era
   `installCommand: "cd ../.. && npm install --no-audit --no-fund"` and **only five crons**
   (no `lead-raw-batch`). Ours has the workspace-scoped `npm ci --workspace=Property/web
   --include-workspace-root` and six. **Ours wins outright. Do not touch this file during the port.**

5. **`package.json`.** Theirs pins `"@accounting-network/web-shared": "file:vendor/web-shared"`
   (`Property_zip/web/package.json:15`). Never port that line, and never port `web/vendor/`.

---

## 7. Their notable form changes, and what each means for our wiring

### 7a. `LeadForm` is still seven required fields
`CONTEXT_SUMMARY_SESSION8.md:322`, `SESSION9.md:358`, `SESSION10.md:294`, `SESSION11.md:236`.
They flag it four times as "the biggest conversion lever left" and never changed it. Their
`LeadForm.tsx` diff (`8041183..eb745e1`) is **three lines, all `rounded-lg` → `rounded-xl`**.
**Wiring impact: none.** This stays an open owner decision (CONTEXT §7), not a port task.

### 7b. The one-form rule
`web/DESIGN_GUIDELINES.md:102` and `CONTEXT_SUMMARY_SESSION11.md:101`: never put two seven-field
`LeadForm` instances in one DOM. It is why their `PremiumUpgrade` gained
`mobileFallback: "capture" | "link"` (`Property_zip/…/PremiumUpgrade.tsx:64, 84, 105`) — on
calculator pages the mobile slot renders an anchor to `#get-expert-help` with
`data-cta="premium_tool_mobile"` instead of a third form.
**Wiring impact:** if we adopt `mobileFallback="link"` we **delete the `mobile_tool` `form_id`
from those pages**. `mobile_tool` is in `MINIFORM_FORM_IDS`
(`Property/web/src/config/deploy-watch.ts:145-154`) and in `SURFACE_LABELS`
(`role-labels.ts:38`) and `value-score.ts`. Removing a live surface with 2 leads / 3 starts in
the 28-day baseline (`LEAD_CAPTURE_MAP.md`) is a **conversion decision, not a design one.**
Their anchor target exists on our calculator pages already (`id="get-expert-help"` at
`app/calculators/*/page.tsx`), so the link would not 404.

### 7c. `LeadForm` must sit on a white or light surface
`DESIGN_GUIDELINES.md:110`, `CONTEXT_SUMMARY_SESSION11.md:96, 191`. Labels are `text-slate-900`.
**Confirmed broken in our tree at `BlogPostRenderer.tsx:292`.** Their fix wraps the form in a
white card inside the navy band (`Property_zip/…/BlogPostRenderer.tsx:387`). **Fix this
independently of the port — see R1.**

### 7d. Soft-gated calculator results (`ResultGate` + `resultGateStorage`)
New files: `Property_zip/web/src/components/calculators/ResultGate.tsx` (103 lines),
`resultGateStorage.ts` (28 lines), `HeldResult.tsx` (90 lines).
Rules, from their docstring (`ResultGate.tsx:7-29`): inputs stay live, only the result is held;
embeds never gated (`enabled={variant !== "embed"}`); **every** calculator gates independently;
converted visitors never gated; reveal persisted per campaign in `sessionStorage` under
`ptp_calc_revealed_${campaign}` (`resultGateStorage.ts:115`), explicitly to avoid the
"unlock one, unlock all" bug; skipping always reveals; the held state renders the **real**
figure behind frosted glass, never a fake number.

Wired into all five bespoke calculators: `StampDutyCalculator.tsx:152`,
`Section24Calculator.tsx:103`, `IncorporationCostCalculator.tsx:130`,
`MTDCheckerCalculator.tsx:86`, `PortfolioProfitabilityCalculator.tsx:183`, plus
`PremiumCalculator.tsx:644` reuses `HeldResult` + `resultGateStorage`.

**Wiring impact, and this is the important one:**
- `ResultGate` calls `<ResultGateModal campaign onReveal />` — **exactly our wrapper's
  signature** (`Property/web/src/components/calculators/ResultGateModal.tsx:31-37`). It drops in
  with no adapter. Its other imports (`isConverted`, `track` from `@accounting-network/web-shared/analytics/*`,
  `btnSecondary` from `layout-utils`) all resolve in our tree. **VERIFIED.**
- It **extends `calc_result_gate` from in-blog premium calculators only to all five standalone
  calculator pages**. Today `gated = placement === "blog" && !isConverted()`
  (`PremiumCalculator.tsx:483`) — calculator pages are never gated. That is a live conversion
  change on our highest-traffic tools.
- They **deleted `CalcResultCta.tsx`** (`0 36` in the numstat, `D` in `--name-status`) and there
  are **zero references to it left in their tree**. The `calc_result` `form_id` disappears from
  their design entirely, replaced by the "Confirm my figure with a specialist" button at
  `ResultGate.tsx:93` which reopens the same `calc_result_gate` modal.
  `calc_result` is in `MINIFORM_FORM_IDS` and had **0 leads / 3 starts** in the 28-day baseline,
  so `LEAD_CAPTURE_MAP.md` already lists it as a retirement candidate — but retiring it is still
  an owner call, and `deploy-watch` counts against `BASELINE_MINIFORM_LEADS_28D = 15` which
  includes it (`config/deploy-watch.ts:145-166`).
- Their `ResultGate` fires two new `cta_click` ids: `calc_see_result` and `calc_confirm_figure`
  (`:64`, `:77`). Neither is in our analytics allowlist. **Must be added or the events drop.**

**Recommendation:** port `ResultGate` + `resultGateStorage` + `HeldResult` as a **flagged,
reversible** change, keep `CalcResultCta` in the tree until the owner signs off on retiring
`calc_result`, and treat the calculator-page gating as an experiment with a stated read date.
Blast radius: the five calculator pages. Revert: delete three files, unwrap five call sites.

### 7e. `LeadCTAPanel` (designer-only, 176 lines)
`Property_zip/web/src/components/property/LeadCTAPanel.tsx`. Embeds the real `LeadForm` at `:172`
with a `redirectOnSuccess` passthrough; calculator pages pass `false` so the result stays on
screen. Rendered on **20+ routes** (about, blog index, all 6 calculator pages, incorporation,
landlord-tax, locations, locations/[slug], MTD, property-tax-rates, landlord-tax-index,
section-24, all 4 services pages, services index, `BlogCategoryHub.tsx:182`).
**Wiring impact:** it is our existing `LeadForm` and our existing `/api/leads/submit`. No new
endpoint, no new `form_id`, no payload change. Its blockers are pure design-system dependencies
(`Eyebrow` from `components/ui/page-blocks`, `HeroBrickBackdrop`, `siteContainerLg`, `lucide-react`
`Check`) which belong to the design-system port, not this one.

### 7f. `ResultGateModal` change
Their diff is `4/9` lines, cosmetic plus removing the local `messageMinLength={40}` /
`messageMinWords={8}` overrides. **Ours already dropped those floors deliberately** — see §9.

---

## 8. HARD FLAG — what we deleted, and what the designer would bring back

Asked for explicitly in the brief. Both deletions checked with
`git log --oneline 1d68a570..HEAD -- <path>`.

### 8a. `MiniCapture.tsx` −739 lines — **safe, do not restore**

Single commit `ec38f821` "Step 2.5b: extract conversion stack to web-shared + multistep fixes"
(2026-07-17), `30 insertions / 739 deletions`. It was **not a removal of behaviour**. The 739
lines moved to `packages/web-shared/leads/MiniCapture.tsx` (+697) alongside
`capture-steps.ts` (+154), `ResultGateModal.tsx` (+100), `CalcResultCta.tsx` (+43),
`MobileToolSlot.tsx` (+41), and Property was reduced to a 42-line wrapper.

Two behaviour changes were folded into that commit and are **root-caused, data-backed, and must
survive the port**:
- **Message floor 40 chars / 8 words → 20 / 4** (`packages/web-shared/leads/capture-steps.ts:16-17`).
  Commit message: *"96% of form_error events were users blocked by the floor"*.
  The designer's local `capture-steps.ts` still has 40/8. **If their file is ported over ours,
  we re-break the thing that was generating 96% of our form errors.**
  A prior read of this diff called our 20/4 a "regression" — it is the opposite.
- **`deploy-watch` error-share verdict gains a `LOW_VOLUME` guard below 10 completions**
  (`Property/web/src/config/deploy-watch.ts`). The 343% day-3 ACTION was 14 errors / 2 completions.

**Verdict: no reintroduction risk from the designer's `MiniCapture.tsx`. Their entire diff on it
is six lines of `rounded-lg` → `rounded-xl` plus dropping the `border-l-4 border-emerald-600`
accent from the default `className`. Port those as CSS, into the shared file, never the file.**

### 8b. `ResourceGate.tsx` −354 lines — **DO NOT RESTORE. THIS IS THE FLAG.**

Commit `5c156c51` "fix(observability): stop the noise, delete the monitors that were lying"
(2026-08-16). It removed, in one go:

- `Property/web/src/components/resources/ResourceGate.tsx` (−354)
- `Property/web/src/components/resources/ResourceGateLazy.tsx` (−37)
- `ExcelPreview`
- the route `/api/resources/deliver`
- `scripts/property_synthetic_lead_check.mjs` — the caretaker's "single most important" money-path
  probe, which *"inserted straight into PostgREST exactly as ResourceGate used to and had therefore
  been passing green on a path nothing uses"*
- the `copy` / `split` / `placement` / `category` props from `GateOrForm`

Reasons, verbatim from the commit: the gate **lost its A/B ("50 views, 0 unlocks")** and
`GateOrForm` has rendered `MiniCapture` instead ever since `f90f6cca`, two months earlier. The
component was unreachable but still in the tree, and *"three docstrings still described the gate
in the present tense. Those comments led this very session to report a dead surface as a revenue
outage."* Property-only: eight other sites still render theirs.

**The designer's tree still contains all of it, restyled:**
- `Property_zip/web/src/components/resources/ResourceGate.tsx` — diff `4/4`, pure `rounded-xl`
- `Property_zip/web/src/components/resources/ResourceGateLazy.tsx` — present, untouched
- `Property_zip/web/src/app/api/resources/deliver/route.ts` — present, **not quarantined**
- their `GateOrForm.tsx` still accepts `copy`/`split`/`placement`/`category`
- their `submit-client.ts:13` header still says *"The ResourceGate download surface keeps the
  shared direct path"*

**Concretely, porting `ResourceGate` would:**
1. Reopen a lead path that **bypasses `/api/leads/submit`** — no server validation, no dedupe,
   no Twilio/ZeroBounce verification, no nurture enrolment, no `bookingToken`.
2. **Ship client-side Supabase credentials again.** We currently ship none
   (`submit/route.ts:15-16`).
3. Reintroduce a lead shape (`role: "resource"`, empty name and phone) that is
   **contractually excluded from partner forwarding** (DSA Annex B.2) and from nurture
   reconciliation — an exclusion whose enforcement code went away with the component.
4. Add back an external-email sender (`/api/resources/deliver`) that emails leads download
   links, against a Resend from-domain the route's own header admits may not be verified.
5. Re-create the exact failure mode that produced a false revenue-outage report six days ago.

**Nothing in `web/src/components/resources/ResourceGate.tsx`, `ResourceGateLazy.tsx`,
`ExcelPreview.tsx` or `web/src/app/api/resources/` may be ported. Their `GateOrForm.tsx` must
not be ported either — take ours and re-apply only its `className` string.**
CONTEXT §7 already lists `ResourceGate`, `ResourceGateLazy` and `ExcelPreview` as "dead
components pending a decision" (designer session 10 §7). **They are not pending. They are
decided and deleted. Update CONTEXT §7.**

### 8c. Other things we removed that the designer's tree still has
Not deletions from the snapshot window, but the same class of risk:

- `ExitIntentModal` — removed 2026-07-09 (`app/layout.tsx:106`, inert since 06-29).
- The blog subscribe block — removed 2026-07-09, *"16,290 views / 0 submits all-time"*
  (`BlogPostRenderer.tsx:377`).
- `StickyCTA` on blog articles — removed 2026-07-09, *"586 shown / 1 click"*
  (`BlogPostRenderer.tsx:390`). It survives on the homepage only (`app/page.tsx:298`).
- The `SpecialistWidget` escalating cadence — capped to **one proactive ping per session across
  all triggers** on 2026-07-09 (`SpecialistWidget.tsx:111-113`, *"1,882 shown / 6 clicked /
  219 dismissed"*). Their `SpecialistWidget.tsx` diff is `24/17` and appears to keep this, but
  it **must be checked line by line before porting**, because reversing it would re-create the
  site's biggest interrupter and that is a CLAUDE.md rule-6 violation, not a design preference.
  **INFERRED: I read our version's guard, not their full 811-line file.**

---

## 9. The wrapper trap (port mechanics)

Six files where a naive file-for-file port silently forks Property off the shared stack:

| File | Ours | Theirs | Correct action |
|---|---|---|---|
| `components/forms/MiniCapture.tsx` | 42-line wrapper | ~750-line local impl | Keep ours. Apply their 6 cosmetic lines to `packages/web-shared/leads/MiniCapture.tsx`. **Estate-wide, 15 sites — gate it.** |
| `components/calculators/ResultGateModal.tsx` | 49-line wrapper + topic-aware copy | local impl | Keep ours. Their `4/9` diff is cosmetic. |
| `components/calculators/CalcResultCta.tsx` | 40-line wrapper | **deleted** | Keep ours pending the `calc_result` retirement decision (§7d). |
| `lib/leads/capture-steps.ts` | pure re-export of shared | local impl, floors 40/8 | Keep ours. **Never take theirs — §8a.** |
| `components/analytics/useFormTracking.ts` | shared-backed | local | Keep ours. |
| `components/calculators/premium/MobileToolSlot.tsx` | wrapper over shared | local | Keep ours. |

**Consequence of the estate-wide files:** the `rounded-lg` → `rounded-xl` and
`border-l-4 border-emerald-600` removal in `MiniCapture` would change the look of the mini-form
on **all 15 sites**, not just Property. Same class of item as the `Field.tsx` toggle fix in
CONTEXT §5. Treat as its own gated task.

---

## 10. RECONNECTION CHECKLIST

Numbered, testable, in the order to run them. Every command is local. **No production writes.**
Assumes `npm run dev` in `Property/web` on `http://localhost:3000` and a `.env.local` with the
same keys as prod except pointed at a non-prod Supabase, or with `adminConfigured()` false where
noted.

**Before you start:** every POST below uses `"source": "test"` or a `@test.` / `@example.` email,
which sets `is_test: true` at `submit/route.ts:75-82` and keeps the row out of every operator
surface. Add `"skip_verification": true` to avoid spending a Twilio Lookup and a ZeroBounce
credit (honoured only for test leads, `:280`). **Delete every row you create — see B12.**

### A. Static gates (no server needed)

**A1. No new or resurrected endpoint.**
```bash
cd Property/web
find src/app/api -name route.ts -o -name 'route.tsx' | sort > /tmp/after.txt
git show HEAD:Property/web/... # or: git diff --name-status main -- src/app/api
```
PASS = the route list is exactly the 28 in §3. **FAIL if `src/app/api/resources/` exists.**

**A2. No `.disabled` or `vendor/` artefact survived the port.**
```bash
cd Property/web && find . -name '*.disabled' -not -path './node_modules/*'; ls vendor 2>/dev/null
```
PASS = both empty.

**A3. No client-side Supabase credentials shipped.**
```bash
cd Property/web && grep -rn "NEXT_PUBLIC_SUPABASE" src/ | grep -v node_modules
```
PASS = zero hits. Any hit means `ResourceGate` or its `submitLead` helper came back.

**A4. One submission path.**
```bash
cd Property/web && grep -rn 'fetch("/api/' src/ --include=*.tsx --include=*.ts
```
PASS = exactly 5 hits: `submit-client.ts` (submit), `DetailsForm.tsx` (complete),
`BookingPicker.tsx` x2 (book, booking-viewed). **Any sixth hit is the worklist.**

**A5. Message floors unchanged.**
```bash
grep -n "MINI_MESSAGE_MIN" packages/web-shared/leads/capture-steps.ts
```
PASS = `MIN_CHARS = 20`, `MIN_WORDS = 4`. **FAIL at 40/8 — §8a.**

**A6. Cron cadence and recipients unchanged.**
```bash
git diff --stat -- Property/web/vercel.json
grep -rn "resolveLeadTo\|LEADS_NOTIFY" Property/web/src/lib/lead-routing.ts
```
PASS = `vercel.json` untouched, six crons, `DEFAULT_CC_EXCLUDED_SOURCES = "property,test"`.

**A7. Digest still log-only.**
```bash
grep -rn "emails.send\|sendEmail" Property/web/src/lib/leads/nurture-digest.ts
```
PASS = no send call. It was disarmed in `5c156c51`; the cron and its stamp stay.

**A8. Typecheck and tests.**
```bash
cd Property/web && npx tsc --noEmit && npm test
```
The wrapper trap (§9) surfaces here as missing `siteConfig` / `submitLead` props.
Four test files touch the disputed routes: `calculator-goldens`, `call-brief`,
`intent-engine`, `qa-gate`.

**A9. Dependency closure (required before any deploy, `standard_terms` §6).**
```bash
python scripts/check_dependency_closure.py
```

### B. Live wires (dev server)

**B10. `/api/leads/submit` — the money path, full mode.**
```bash
curl -sS -X POST http://localhost:3000/api/leads/submit \
  -H 'Content-Type: application/json' \
  -d '{"full_name":"Test Porter","email":"port-check@test.example",
       "phone":"07700900123","role":"Other",
       "message":"Port verification, please ignore. Two BTLs in my own name.",
       "source":"test","source_url":"http://localhost:3000/contact",
       "consent_given":true,"skip_verification":true,
       "extras":{"qa":true,"form_id":"lead_form"}}' | jq
```
PASS = `{"success":true,"leadId":"<uuid>","bookingToken":"<token>"}`.
`bookingToken` absent means `LEAD_NURTURE_TOKEN_SECRET` is unset (`submit/route.ts:364`) and
`/thank-you` will silently lose its slot picker.

**B11. `/api/leads/submit` — email_only mode (SpecialistWidget contract).**
```bash
curl -sS -X POST http://localhost:3000/api/leads/submit \
  -H 'Content-Type: application/json' \
  -d '{"full_name":"","email":"port-widget@test.example","phone":"","role":"Other",
       "message":"[Specialist question] Port verification, please ignore.",
       "source":"test","captureMode":"email_only","skip_verification":true,
       "extras":{"qa":true,"capture_channel":"assistant"}}' | jq
```
PASS = `success: true` with empty name and phone accepted (`submit/route.ts:125-127`).
Then confirm `routePrimarySequence` put it in **detail-capture**, not contactability:
```sql
select ln.sequence_name, l.email
from lead_nurture_state ln join leads l on l.id = ln.lead_id
where l.email = 'port-widget@test.example';
```

**B12. Validation floor still rejects.**
```bash
curl -sS -o /dev/null -w '%{http_code}\n' -X POST http://localhost:3000/api/leads/submit \
  -H 'Content-Type: application/json' \
  -d '{"full_name":"A","email":"nope","phone":"1","message":"x","source":"test"}'
```
PASS = `400`.

**B13. Honeypot is tag-only, never a silent drop.**
Repeat B10 with `"enquiry_ref":"http://spam.example"` and a fresh email.
PASS = `success: true`, and:
```sql
select extras->>'honeypot' from leads where email = '<fresh>';  -- expect "true"
```
Every historical hit was browser autofill on a real human (`submit/route.ts:112-116`).

**B14. Dedupe merge, including the plus-alias case (2026-08-19 incident).**
Submit `port+alias@test.example`, then `port@test.example`, both `source: "test"`, within 24h.
PASS = **one** row, `message` containing both bodies joined by `\n\n---\n`, and `extras`
merged rather than replaced (`submit/route.ts:197-240`).

**B15. Clean up. Do this every time.**
```sql
delete from leads where is_test = true and email like '%@test.example';
```
Cascades to `lead_verification`, `lead_contact_events`, `lead_nurture_state`.

**B16. `/api/leads/complete`.** Mint a `profile` token for a test lead, then:
```bash
curl -sS -X POST http://localhost:3000/api/leads/complete \
  -H 'Content-Type: application/json' \
  -d '{"token":"<profile-token>","full_name":"Test Porter","enquiry_ref":""}' | jq
```
PASS = `{"success":true,"stillMissing":["phone"]}` → `DetailsForm` renders the "partial" card
(`DetailsForm.tsx:112-116`). Supply the phone next; PASS = `stillMissing: []` plus a
`bookingToken`, which drives the `/book?t=` link at `DetailsForm.tsx:137`.

**B17. `/api/leads/book` + `/api/leads/booking-viewed`.**
Load `http://localhost:3000/book?t=<book-token>`. PASS = `booking-viewed` fires on mount
(`BookingPicker.tsx:37`) and a slot POST to `/api/leads/book` returns success.
Then `GET /api/leads/ics?t=<book-token>` returns `text/calendar`.

**B18. `/api/leads/notify` health probe (no auth, booleans only).**
```bash
curl -sS http://localhost:3000/api/leads/notify | jq
```
PASS = `{"secretSet":true,"resendSet":true,"notifyToProperty":true,...}`
(`notify/route.ts:125-129`). **Do not POST a fake webhook payload at prod.**
Auth check, locally:
```bash
curl -sS -o /dev/null -w '%{http_code}\n' -X POST http://localhost:3000/api/leads/notify \
  -H 'Content-Type: application/json' -d '{}'          # expect 401
```

**B19. Cron auth, all six.**
```bash
for p in lead-nurture lead-nurture-digest lead-retention lead-reconcile deploy-watch lead-raw-batch; do
  printf '%s ' "$p"
  curl -sS -o /dev/null -w '%{http_code}\n' "http://localhost:3000/api/cron/$p"
done
```
PASS = `401` six times. **Never run these against production during the port**: `deploy-watch`
emails the owner (`route.ts:251`) and `lead-raw-batch` messages Telegram (`:67`).

**B20. Signed-token routes reject a bad token.**
```bash
for r in "leads/confirm/deadbeef" "leads/optout/deadbeef" "leads/forwarded/deadbeef" "leads/offer/deadbeef" "leads/claim/deadbeef"; do
  printf '%s ' "$r"; curl -sS -o /dev/null -w '%{http_code}\n' "http://localhost:3000/api/$r"
done
```
PASS = no 200 with an action performed. GET renders a scanner-safe confirm page by design;
the POST is what acts.

**B21. `/api/leads/sync` stays dormant.**
```bash
curl -sS http://localhost:3000/api/leads/sync | jq
```
PASS = configured `false`. **Do not arm it.** Preconditions are stated in its own file header:
a privacy-policy processor disclosure and a retention purge path.

**B22. `/api/track` still ingests.**
```bash
curl -sS -o /dev/null -w '%{http_code}\n' -X POST http://localhost:3000/api/track \
  -H 'Content-Type: application/json' -d '{"events":[]}'
```
PASS = `204`.

### C. Rendered-surface walk (browser, dev server)

For each, confirm the form **renders**, its **labels are readable**, and a submit produces the
right `form_id`. Verify `form_id` with:
```sql
select props->>'form_id', props->>'flow', count(*)
from web_events where event_name in ('form_start','form_submit','lead')
  and created_at > now() - interval '1 hour'
group by 1,2;
```

| # | Route | Surface | Expect |
|---|---|---|---|
| C23 | `/contact` | `LeadForm` | 7 required fields, labels visible, redirect to `/thank-you?...` |
| C24 | `/` | `LeadForm` + `StickyCTA` | one `LeadForm` in the DOM (one-form rule), sticky bar `data-cta="sticky_cta"` |
| C25 | `/blog/<any-article>` | `LeadForm` at the foot | **labels must be readable — this is R1** |
| C26 | `/blog/<article with mid-scroll split>` | `InlineMiniLeadForm` | `form_id=inline_mini` |
| C27 | `/blog/<article with a resource topic>` | `GateOrForm` | renders `MiniCapture`, `form_id=resource_block`. **A download gate here = §8b failure.** |
| C28 | `/blog/<article with a premium tool>` | `PremiumCalculator` | in-blog result gated; modal `form_id=calc_result_gate`; **must not redirect on success**, must reveal after 1.8 s |
| C29 | same, viewport < 640px | `MobileToolSlot` | `form_id=mobile_tool` (or the `#get-expert-help` anchor if 7b is adopted) |
| C30 | `/calculators/stamp-duty-calculator` | `LeadForm` at `#get-expert-help`, `redirectOnSuccess={false}` | inline success panel, result stays on screen |
| C31 | all 6 calculator pages | `CalculatorPageResources` → `PremiumUpgrade` | exactly **one** seven-field form per page |
| C32 | `/embed/<calculator>` | `EmbedCta` | absolute `propertytaxpartners.co.uk` href, UTM tags intact, **never gated** (`enabled={variant !== "embed"}`) |
| C33 | any page, wait 30 s | `SpecialistWidget` | **at most one** proactive ping per session (`SpecialistWidget.tsx:113`); submit gives `captureMode: email_only`, in-thread confirmation, no redirect |
| C34 | `/thank-you?t=<token>` | `BookingPicker` | slot grid renders, `booking-viewed` fires |
| C35 | `/complete?t=<profile-token>` | `DetailsForm` | only the missing field(s) render, never email, never message |
| C36 | deep scroll on a blog page | `DeepScrollModal` | fires at most once per topic per 30 days (`ptp_deepscroll_${topic}`) |

### D. Only if the `ResultGate` soft-gate is adopted (§7d, owner decision)

**D37.** All five bespoke calculators wrapped, `enabled={variant !== "embed"}` on each.
**D38.** `sessionStorage` key is `ptp_calc_revealed_${campaign}`, **per calculator**. Reveal
stamp-duty, navigate to section-24: the second must still be gated. This is the exact
"unlock one, unlock all" bug their docstring names.
**D39.** Embeds ungated: load `/embed/stamp-duty-calculator`, result visible immediately.
**D40.** Converted visitor ungated: submit any form (which calls `setConverted()` via
`useFormTracking.ts:63`), then load a calculator; result shows with no gate.
**D41.** Skip always reveals: press "See my result", then close the modal by X, backdrop and
Esc in turn. All three must reveal (`ResultGateModal.tsx:31-46`).
**D42.** Add `calc_see_result` and `calc_confirm_figure` to the analytics allowlist in
`packages/web-shared/analytics/types.ts`, or both events drop silently.
**D43.** If `CalcResultCta` is retired, remove `calc_result` from `MINIFORM_FORM_IDS`
(`config/deploy-watch.ts:145-154`) **and** restate `BASELINE_MINIFORM_LEADS_28D` — the current
baseline of 15 includes it. Leaving both would make `deploy-watch` compare a shrunken surface
set against an unshrunken baseline and fire a false ACTION at the owner.

### R. Fix now, independently of the port

**R1.** `Property/web/src/components/blog/BlogPostRenderer.tsx:292` — put the `LeadForm` on a
white card inside the navy band, or the labels stay invisible. Live on every article.
One-line class change. Verify by loading any article and reading the labels.

**R2.** `docs/Property/LEAD_CAPTURE_MAP.md` — delete the `ResourceGate` row (§1), correct the
`MiniCapture` path to the shared package, mark `exit_intent` retired.

**R3.** `tmp/design_migration/CONTEXT.md` §7 — move `ResourceGate`, `ResourceGateLazy` and
`ExcelPreview` out of "dead components pending a decision". They are deleted, with a reason.

---

## 11. Open questions for the owner (do not guess)

1. **Adopt the `ResultGate` soft gate on the five standalone calculator pages?** It extends
   gating from in-blog tools to our highest-traffic pages. Recommendation: yes, flagged and
   reversible, with a stated read date. Blast radius: 5 pages. Revert: 3 files, 5 call sites.
2. **Retire `calc_result` (`CalcResultCta`)?** The designer deleted it. Our own data says
   0 leads / 3 starts over 28 days. If yes, D43 must run with it.
3. **Adopt `mobileFallback="link"` on calculator pages?** It removes the `mobile_tool` surface
   from those pages (2 leads / 3 starts on the baseline) to satisfy the one-form rule.
4. **The `MiniCapture` restyle is estate-wide** (15 sites). Same gate class as the `Field.tsx`
   toggle fix in CONTEXT §5.
5. **`LeadForm`'s seven required fields** remain unvalidated, as CONTEXT §7 already records.
