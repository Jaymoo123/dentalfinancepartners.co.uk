# Property Capability Standard

**Type:** Site-agnostic shared standard. The engineering yardstick for every niche site (property, dentists, solicitors, medical, generalist, digital-agency, contractors-ir35). Lives in `docs/_engines/` because it is methodology, not site facts. Per-site audit *results* live in `docs/<site>/` (e.g. `docs/generalist/CAPABILITY_AUDIT_2026-06.md`); per-site inventory tuning (which tools, which content corpus) lives in per-site config, never here.

**Status:** v1-FINAL (2026-06-10) — FROZEN for site audits. All sections user-reviewed (§0-§3 individually; §4-§10 via the locked consistency sweep of 2026-06-10: LD-04 split → LD-09, EN-01/EN-02/EN-06/CT-03/CT-07/ED-07 tightened). Capability IDs are stable and citable. Changes from here require a versioned amendment, not silent edits.

---

## §0 How to read this standard

**Purpose.** Property (`Property/web`) is the best-built of the six sites. This document extracts from it an instance-agnostic, testable statement of what every site must be able to DO and how disciplined the engineering must be. It is the yardstick for auditing and uplifting the other five sites. It is explicitly NOT a list of Property's calculators, content, or visual design.

### The three axes

Every capability carries exactly one axis tag. The axes are judged differently and an auditor must never confuse them.

| Tag | Meaning | Audit rule |
|---|---|---|
| `[Mechanism]` | Shared machinery and engineering quality | Benchmarked against this standard. A gap is a finding. (~90% of capabilities.) |
| `[Inventory]` | What the site contains (tools, content, pages) | Per-site and niche-driven. The standard mandates only the *machinery and process* for holding inventory. "Missing Property's X calculator" is NEVER a valid finding. A site may legitimately have more, fewer, or different instances than Property. |
| `[Design]` | Look, feel, brand | Per-site identity, deliberately distinct. Only the *discipline* (tokens, conventions, accessibility, performance) is benchmarked. "Doesn't look like Property" is NEVER a valid finding. |

### Tiers and Property-status

Each capability has a **tier** (the obligation) and a **Property-status** (honesty about the benchmark). They are orthogonal.

- **Tier:** `[MUST]` (a site failing this is non-compliant) or `[SHOULD]` (justified exceptions allowed; the audit records the justification).
- **Property-status:** `compliant` | `partial` | `non-compliant` | `not yet built`.

The standard is the yardstick; Property is merely its best current approximation. Where Property is marked `partial` or `non-compliant`, the entry carries an **Anti-pattern (do not copy)** line citing the offending implementation. **Auditing a sister site against Property's implementation of a non-compliant capability is itself an audit failure.** Where a capability is `not yet built` anywhere, it is a forward requirement agreed for the program (e.g. the JSONB extras column on `leads`).

### Evidence is not the requirement

Every capability cites **Evidence (Property, dated)**: file paths showing one valid implementation as of the stated date. Evidence is non-normative. A reference to `lib/sdlt.ts` demonstrates "domain compute isolated from UI"; it does not mean a site needs a stamp-duty calculator. Sister sites need not mirror Property's directory layout; only the behaviour in the capability statement is required. Evidence refs may rot; Verify lines never depend on them.

### Verify lines

Every capability ends with **Verify (any site)**: one concrete check (a grep pattern, a request to make, a build to break, a browser step) phrased against behaviour or contracts, never against Property's paths. If a check can only be executed on Property, it is wrongly written. Greps below use ripgrep syntax from the site's own source root.

### Audit procedure

1. Work through sections in order (they are dependency-ordered: foundations before systems that consume them).
2. For each capability record: `pass` / `fail` / `partial` / `n/a (justified)` + one line of evidence from the audited site.
3. Sort every finding into its axis. Mechanism gaps go to the uplift backlog. Inventory observations go to the per-site inventory map (a separate, niche-led exercise). Design observations are discipline-only.
4. Capability gaps that the shared mechanism cannot express yet are resolved by EXTENDING the shared mechanism (workspace package, shared schema) and composing per-site — never by forking a one-off.
5. Results live in `docs/<site>/CAPABILITY_AUDIT_<date>.md`, citing capability IDs.

### Program guardrails (apply to all execution that follows an audit)

- `Property/` is READ-ONLY. Findings against Property are recorded, not fixed in place, unless explicitly scheduled.
- Each site's design identity is preserved.
- The shared Supabase schema changes only via deliberate, backward-compatible (nullable) migrations; site-specific fields ride JSONB extras, never per-site columns.

### Section map

| § | Code | Scope |
|---|---|---|
| 1 | PF | Platform foundation & configuration |
| 2 | SEC | Security & runtime discipline |
| 3 | AN | Analytics ingestion & consent |
| 4 | LD | Lead capture & enrichment |
| 5 | TL | Interactive tool platform |
| 6 | CT | Content engine |
| 7 | SEO | SEO & discoverability |
| 8 | EN | Engagement & conversion systems |
| 9 | OB | Observability & admin |
| 10 | ED | Engineering & design discipline |

---

## §1 Platform foundation & configuration (PF)

Scope: how a site knows who it is, how it consumes shared code, how its environment is contracted, and what gates its build. Everything else in this standard assumes these foundations.

#### PF-01 — Config-driven site identity  `[MUST]` `[Mechanism]` `(Property: compliant)`
All niche-specific identity (display/legal name, domain, tagline, navigation, footer links, locations, SEO IDs, lead-form role options and placeholders, CTA copy, content categories, site key) MUST live in one machine-readable config file at the site root, consumed through a single typed loader. Components and routes MUST NOT hardcode identity strings; they read the loader.
- **Evidence (Property, 2026-06):** `Property/niche.config.json`, `Property/web/src/config/niche-loader.ts`, `Property/web/src/config/site.ts`
- **Verify (any site):** grep the site's `src/` for its own display name and bare domain as string literals; legitimate hits only in config/loader and generated artefacts. Then change `display_name` in the config and rebuild: header, footer, and page metadata must all reflect it with no component edits.

#### PF-02 — Config fails loudly, not silently  `[SHOULD]` `[Mechanism]` `(Property: non-compliant)`
The config loader MUST surface a missing or malformed required field as a build-time or first-request failure with a clear message, not pass it through silently.
- **Evidence (Property, 2026-06):** `Property/web/src/config/niche-loader.ts` — the JSON is blind-cast (`as NicheConfig`), so a config missing required fields type-checks and ships.
- **Anti-pattern (do not copy):** asserting the config's type instead of validating it.
- **Verify (any site):** delete a required field (e.g. `domain`) from the site config and build; the build must fail with an error naming the field. Restore afterwards.

#### PF-03 — Shared toolkit consumed, never copy-pasted  `[MUST]` `[Mechanism]` `(Property: compliant)`
Cross-site mechanism code (lead submission, shared schema builders, canonical layout/button utilities) MUST be imported from the workspace package (`@accounting-network/web-shared`), with the consumer transpiling it (`transpilePackages`). A site MUST NOT carry a local reimplementation of anything the package exports.
- **Evidence (Property, 2026-06):** `Property/web/package.json` (workspace dep), `Property/web/next.config.ts` (`transpilePackages`, `outputFileTracingRoot` to repo root), `packages/web-shared/package.json` (source-only package; the `*` specifier is the standard workspace idiom, not a defect)
- **Verify (any site):** grep `src/` for a local definition of `submitLead` or a hand-rolled `fetch` to `/rest/v1/leads`; there must be none — the only path to the leads table is the package import.

#### PF-04 — Shared-package changes verified against all consumers  `[SHOULD]` `[Mechanism]` `(Property: non-compliant)`
Because every site compiles `packages/web-shared` from source, a change there lands on all six sites at once. A change to the shared package MUST be verified by building (at minimum type-checking) every consuming site before it is committed, via CI or a documented script.
- **Evidence (Property, 2026-06):** no CI workflow or repo script performs a cross-site build check; nothing enforces this today.
- **Anti-pattern (do not copy):** editing `packages/web-shared` and building only the site you are working on.
- **Verify (any repo state):** a runnable command or CI job exists that builds/type-checks all sites against the current shared package; run it and confirm it would catch a deliberately broken export.

#### PF-05 — Documented environment contract  `[MUST]` `[Mechanism]` `(Property: partial)`
Every environment variable the site reads MUST appear, with a placeholder and a one-line purpose, in a committed `.env` example file. Secrets MUST NOT be exposed under `NEXT_PUBLIC_`. Optional integrations MUST be inert (not crashing) when their variable is unset.
- **Evidence (Property, 2026-06):** `Property/web/.env.local.example` documents the 4 public vars only; the ~15 server-side vars (`SUPABASE_SERVICE_ROLE_KEY`, `LEADS_NOTIFY_SECRET`, `RESEND_API_KEY`, `CRON_SECRET`, `ADMIN_DASHBOARD_KEY`, `GOOGLE_*`, `COMPANIES_HOUSE_API_KEY`, ...) are undocumented.
- **Anti-pattern (do not copy):** documenting only the `NEXT_PUBLIC_` vars and leaving the server-side contract in tribal knowledge.
- **Verify (any site):** list distinct `process.env.X` names in `src/` and diff against the example file: zero undocumented names, zero secret-shaped names with a `NEXT_PUBLIC_` prefix.

#### PF-06 — Strict, gated build  `[MUST]` `[Mechanism]` `(Property: compliant)`
TypeScript strict mode MUST be on, linting MUST run as part of the production build (not bypassed), and a failing build MUST block deployment.
- **Evidence (Property, 2026-06):** `Property/web/tsconfig.json` (`"strict": true`), `Property/web/next.config.ts` (`eslint.ignoreDuringBuilds: false`)
- **Verify (any site):** confirm `strict: true` and that the config does not set `ignoreDuringBuilds`/`ignoreBuildErrors` to true; introduce a deliberate type error and confirm `next build` fails. Revert.

#### PF-07 — Registered site key end-to-end  `[MUST]` `[Mechanism]` `(Property: partial)`
The site MUST have a single canonical site key, declared in its config, and that exact key MUST be (a) accepted by the shared `leads.source` CHECK constraint and (b) used as `site_key` on every analytics/subscriber row the site writes — always read from config, never hardcoded per-surface.
- **Evidence (Property, 2026-06):** `Property/niche.config.json` (`content_strategy.site_key` / `source_identifier`), `supabase/migrations/000_create_core_tables.sql` (`leads.source` CHECK list). But `api/subscribe/route.ts:20` hardcodes `const SITE_KEY = "property"` instead of reading the config — a literal that would silently mis-attribute data if the route were copied to another site.
- **Anti-pattern (do not copy):** `const SITE_KEY = "<niche>"` in a route file.
- **Verify (any site):** read the key from the site config; confirm it appears in the shared leads CHECK constraint migration chain; grep the site's `src/` for any hardcoded source/site-key string literal outside the config loader — there must be none.

---

## §2 Security & runtime discipline (SEC)

Scope: security headers with a deliberate embed exception, explicit runtime choices on server endpoints, webhook authentication, rate limiting, privileged-access boundaries, and bot-defence posture. Dashboard auth is §9; lead-form-specific protections are §4.

#### SEC-01 — Security header baseline  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every non-embed response MUST carry: HSTS (long max-age, includeSubDomains, preload), framing denial (`X-Frame-Options: DENY` and/or `frame-ancestors 'none'`), `X-Content-Type-Options: nosniff`, a Referrer-Policy, a Permissions-Policy disabling unused sensors, and a Content-Security-Policy.
- **Evidence (Property, 2026-06):** `Property/web/next.config.ts` `headers()` — full set applied to `/((?!embed/).*)`
- **Verify (any site):** request any page and inspect response headers; all six present with sane values.

#### SEC-02 — CSP without unsafe script sources  `[SHOULD]` `[Mechanism]` `(Property: non-compliant)`
The CSP `script-src` SHOULD NOT include `'unsafe-inline'` or `'unsafe-eval'`; use nonces/hashes for the framework's inline runtime and consent-gated third-party scripts. A CSP that allows arbitrary inline script mostly neutralises itself against XSS.
- **Evidence (Property, 2026-06):** `Property/web/next.config.ts` — `script-src 'self' 'unsafe-inline' 'unsafe-eval' ...` on both the locked-down and embed policies.
- **Anti-pattern (do not copy):** shipping a comprehensive-looking CSP whose script-src waives the protection.
- **Verify (any site):** read the served CSP header; `script-src` carries no `unsafe-*` tokens (or the audit records the documented exception and what bounds it).

#### SEC-03 — Frameability is a scoped, deliberate exception  `[MUST]` `[Mechanism]` `(Property: compliant)`
If the site exposes embeddable surfaces, frameability (`frame-ancestors *`, no `X-Frame-Options`) MUST be granted only to the dedicated embed route prefix; every other route stays framing-denied. Sites with no embeds: everything framing-denied.
- **Evidence (Property, 2026-06):** `Property/web/next.config.ts` — separate `embedHeaders` for `/embed/:path*`, locked headers for everything else.
- **Verify (any site):** request one embed route and one ordinary route; compare framing headers. The frameable set must exactly match the embed prefix.

#### SEC-04 — Explicit runtime and timeout per server endpoint  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every API route MUST declare its runtime and a deliberate `maxDuration` budget sized to the work (short for ingest, longer for batch/email/AI), rather than inheriting platform defaults.
- **Evidence (Property, 2026-06):** every route under `Property/web/src/app/api/` exports `runtime` + `maxDuration` (track 10s, sync/notify 30s, nurture send 60s, enrich 60s).
- **Verify (any site):** grep API routes for `export const runtime` and `export const maxDuration`; each route handler file declares both (or the audit records why the default is right).

#### SEC-05 — Webhook endpoints authenticate, and refuse when unconfigured  `[MUST]` `[Mechanism]` `(Property: partial)`
Every inbound webhook/cron endpoint MUST verify a shared secret, MUST return an error (not process) when its secret is unconfigured, and SHOULD compare secrets timing-safely.
- **Evidence (Property, 2026-06):** `api/leads/{sync,notify,enrich}/route.ts` (`crypto.timingSafeEqual`, 503 when unset), `api/nurture/send/route.ts` (Bearer `CRON_SECRET`, dormant when unset). But `api/nurture/events/route.ts:26` compares with plain `===`.
- **Anti-pattern (do not copy):** plain string equality on a secret header.
- **Verify (any site):** call each webhook route with no/wrong secret — expect 401/403, and 503 (not processing) when the env var is unset; grep those handlers for a timing-safe comparison.

#### SEC-06 — Durable rate limiting on cost-bearing public endpoints  `[SHOULD]` `[Mechanism]` `(Property: non-compliant)`
Public endpoints that trigger cost or side effects per request (email sends, DB writes, AI calls) SHOULD be rate-limited via a store that survives across serverless instances (shared cache, Postgres, or platform WAF rule) — not a per-instance in-memory map, which resets per lambda and provides no real ceiling under fan-out.
- **Evidence (Property, 2026-06):** `api/resources/deliver/route.ts:38-47` — in-memory `Map`, 5/min keyed by email, on that one route only; `api/subscribe` and `api/track` have no rate limit (track is bounded by batch caps instead).
- **Anti-pattern (do not copy):** `const hits = new Map(...)` at module scope as the only limiter.
- **Verify (any site):** enumerate public POST routes that send email or write rows; each has either a shared-store limiter or a documented platform-level rule, demonstrably returning 429 under repeat calls.

#### SEC-07 — Privileged data access stays server-side  `[MUST]` `[Mechanism]` `(Property: compliant)`
Service-role/admin credentials MUST be used only in server code and never reach the client bundle. The anon/public path to the shared database MUST be constrained by RLS to the narrow inserts it needs (lead submission); everything else goes through server routes using the service role.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/supabase/admin.ts` (server-only client), `supabase/migrations/003_add_rls_policies.sql` (anon INSERT-only on leads; analytics tables deny anon)
- **Verify (any site):** grep `src/` — service-role env var referenced only from server modules (no `"use client"` file, no `NEXT_PUBLIC_` alias); confirm RLS policies exist for every shared table the site touches.

#### SEC-08 — Documented bot control on every public write surface  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every public surface that writes data (forms, beacon ingest, subscribe) MUST carry at least one bot control suited to its transport (honeypot, UA/heuristic filtering, platform verification), and the choice — including why stronger controls are NOT used on that transport — MUST be documented in code.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/analytics/server/bots.ts` (layered design: UA heuristic governs beacon ingest; BotID documented as unusable on `sendBeacon` because it carries no client challenge — the 2026-06-08 false-positive incident is written into the comments), honeypot fields on all three form components.
- **Verify (any site):** list public write surfaces; each has an identifiable control in code plus a comment or doc stating the rationale. An undocumented "we'll add it later" surface is a fail.

---

## §3 Analytics ingestion & consent (AN)

Scope: the first-party behaviour analytics pipeline — consent, identity, event vocabulary, transport, ingest, and storage. This is the data foundation that §8 (engagement systems) and §9 (observability) consume. Which *events* a site emits beyond the core set is per-site; the machinery below is not.

#### AN-01 — Single consent source of truth with immediate effect  `[MUST]` `[Mechanism]` `(Property: compliant)`
The site MUST have one consent module — readable outside React so the SDK and third-party loaders share it — holding an explicit tri-state (undecided/granted/denied) in durable client storage. The tracking posture (opt-in vs track-by-default with opt-out) is a documented business/legal decision recorded in that module, with the revert path stated. Consent MUST be re-read on every tracking call so an opt-out takes effect on the next event without a reload, and the consent state at send time MUST be stamped onto the event envelope.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/analytics/consent.ts` — plain-TS module, `ptp_consent` localStorage key, documented 2026-06-05 decision (track-by-default, legitimate interest) including how to revert to opt-in.
- **Verify (any site):** set the consent key to `denied` in devtools, interact with the page, and confirm no further beacons leave; clear it and confirm tracking resumes without reload. The posture decision is written in the consent module, not tribal.

#### AN-02 — Anonymous identity, never derived from PII  `[MUST]` `[Mechanism]` `(Property: compliant)`
Visitor identity MUST be a random id (crypto-sourced) persisted client-side; session identity MUST roll on an explicit idle window and tab close. Neither may be derived from any PII. Storage failures MUST degrade gracefully (per-pageview ids), never crash tracking. If the site serves embeds on third-party origins, the cross-origin stitching decision (Property: deliberately NOT joined) MUST be documented in the identity module.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/analytics/ids.ts` — `crypto.randomUUID` with fallbacks, 30-min idle roll (`LIMITS.SESSION_IDLE_MS`), per-origin isolation decision documented in the header comment.
- **Verify (any site):** read the identity module: ids are random, the idle window is a named constant, and try/catch wraps all storage access. Two ids minted for the same visitor share no derivable structure.

#### AN-03 — Closed event vocabulary, enforced at ingest  `[MUST]` `[Mechanism]` `(Property: compliant)`
Event names MUST come from a single allowlist shared by client and server; the ingest endpoint MUST silently drop events whose name is off-list or which lack the identity envelope (visitor, session, site key). New events enter by editing the allowlist, never by free-form strings.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/analytics/types.ts` (the `EventName` union + `isKnownEvent`), `app/api/track/route.ts` `sanitiseEvents()` (drops unknown names and envelope-less events).
- **Verify (any site):** POST a batch containing an invented event name to the track endpoint; confirm no row lands. Grep client code for `track(` calls — every name must resolve to the allowlist type, not a raw string the type doesn't cover.

#### AN-04 — Loss-resistant batching transport  `[MUST]` `[Mechanism]` `(Property: compliant)`
The client MUST queue and batch events, flushing on size, on a timer, and on pagehide/tab-hide via `sendBeacon` (with `fetch keepalive` fallback) so end-of-visit events survive. The endpoint MUST be same-origin (works inside embed iframes, dodges ad-block lists). Events fired before the SDK is configured MUST be buffered and replayed, not dropped — the first pageview/tool-view is exactly the event you can least afford to lose. Batch and prop sizes are capped on BOTH client and server.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/analytics/track.ts` (queue, flush triggers, pre-config buffer with replay + dedupe and a dev warning at cap), `lib/analytics/types.ts` `LIMITS` (40 events/batch, 4 KB props, flush at 12 or 4 s), server re-caps in `sanitiseEvents()`.
- **Verify (any site):** with devtools network open, interact then close the tab — a final beacon fires on pagehide. Confirm the first tool/page view event reaches the store on a cold load (no race loss).

#### AN-05 — No PII in the analytics store  `[MUST]` `[Mechanism]` `(Property: compliant)`
The pipeline MUST defend against PII at every layer: the client drops prop values shaped like emails/phone numbers; the server drops oversize prop blobs; geo (country/city/region/timezone) comes only from edge headers and the raw IP is NEVER persisted. Analytics rows join to a person only via the deliberate lead-stitching path (§4), not via anything stored in events.
- **Evidence (Property, 2026-06):** `track.ts` `scrubProps()` (email/phone regexes), `api/track/route.ts` (geo from `x-vercel-ip-*` headers, no IP column anywhere in `supabase/migrations/20260605000001_create_web_analytics_tables.sql`).
- **Verify (any site):** fire a tracked event with an email address in a prop value; confirm the prop is absent from the stored row. Confirm the events/sessions schema has no IP column.

#### AN-06 — Ingest-time bot classification with human confirmation  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every batch MUST be bot-classified server-side at ingest (per the transport-appropriate posture of SEC-08), with the verdict and reason persisted on the session row rather than the traffic silently dropped. A session MUST be flagged human-confirmed only when a genuine interaction event arrives, so rollups can separate confirmed humans from ambiguous traffic. The ingest endpoint MUST always return the same empty success response, giving bots no probe signal; failures are logged server-side, never surfaced to the page.
- **Evidence (Property, 2026-06):** `api/track/route.ts` (UA heuristic verdict on every batch, `human_confirmed` flipped by `INTERACTION_EVENTS`, unconditional 204), `lib/analytics/server/bots.ts`, session columns `is_bot`/`bot_reason`/`botid_verified`/`human_confirmed`.
- **Verify (any site):** send a batch with a curl/bot UA → session row flagged bot; send a real-browser batch containing only a page_view → `human_confirmed` false; add a click event → true. Both requests receive identical 204s.

#### AN-07 — Atomic session aggregation through a restricted RPC  `[MUST]` `[Mechanism]` `(Property: compliant)`
Ingest MUST aggregate each batch into one session upsert (sticky flags OR-merged, counters incremented) plus insert-only event rows, executed atomically in the database — not as N independent writes that can interleave across concurrent batches. The ingest function MUST be executable by the service role only.
- **Evidence (Property, 2026-06):** `supabase/migrations/20260605000001_create_web_analytics_tables.sql` — `ingest_web_events(jsonb, jsonb)` (line 322), `REVOKE ALL ... FROM public; GRANT EXECUTE ... TO service_role` (lines 423-424).
- **Verify (any site):** confirm the ingest path is a single RPC call per batch; in the database, confirm anon/authenticated cannot execute it. Two concurrent batches for one session must not lose counter increments.

#### AN-08 — Partitioned, retention-bounded event storage  `[MUST]` `[Mechanism]` `(Property: compliant)`
The event table MUST be insert-only and time-partitioned, with a declared retention period and upcoming partitions created ahead of time (plus a default partition as a safety net). RLS MUST deny anonymous access entirely. Without this, an event table on a growing site becomes an unbounded, unprunable liability.
- **Evidence (Property, 2026-06):** same migration — monthly RANGE partitions on `ts`, 180-day retention declared in the table comment, `web_events_default` + pre-created 2026_06/07/08 partitions, anon-deny RLS.
- **Verify (any site):** inspect the events table: partitioned, retention documented, a future-month partition already exists, and an anon-key SELECT fails.

#### AN-09 — Third-party analytics: consent-gated, optional, one-way  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Third-party analytics (GA4, Clarity, replay tools) SHOULD load only through the consent gate, be inert when their project id is unset, and receive data one-way: high-signal first-party events may be bridged TO them, but they never feed the first-party store, and the site must function fully without them.
- **Evidence (Property, 2026-06):** `components/analytics/ConsentedScripts.tsx` (conditional mount), `Clarity.tsx` (inert without `NEXT_PUBLIC_CLARITY_ID`), `track.ts` `forwardToClarity()` (curated event bridge + session-upgrade for replay sampling at low traffic).
- **Verify (any site):** unset the third-party ids and build/run — no errors, no script tags. Opt out of tracking — no third-party script loads. Grep: nothing reads FROM the third-party tool into the site's own tables.

---

## §4 Lead capture & enrichment (LD)

Scope: how a visitor becomes a lead and what happens after the insert. Leads are the business output of every site; the shared `leads` table is the one place all six sites converge, so the discipline here is the least negotiable in the standard. Which capture surfaces a site deploys (full form, mini capture, gates) is per-site composition; the contract each surface honours is not.

#### LD-01 — One shared submit contract for every lead write  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every lead, from any surface, MUST reach the shared `leads` table through the workspace package's submit function and typed payload — never a hand-rolled insert. The payload type makes consent fields non-optional, so a surface that skips consent cannot type-check. When the database is unconfigured, the surface MUST degrade to a useful fallback (show direct contact details), never crash or pretend success.
- **Evidence (Property, 2026-06):** `packages/web-shared/lib/supabase-client.ts` (`LeadSubmission` — `consent_given/text/at` required), `Property/web/src/components/forms/LeadForm.tsx:96-101` (unconfigured fallback message).
- **Verify (any site):** grep `src/` for `rest/v1/leads` — zero hits outside the package import. Unset the public Supabase env vars and submit: a helpful fallback renders, no crash, no false success.

#### LD-02 — Field validation before submit, errors as telemetry  `[MUST]` `[Mechanism]` `(Property: compliant)`
Capture surfaces MUST validate fields client-side with specific, recoverable messages per field (not one generic failure), and validation failures SHOULD be emitted as analytics events so §9 can surface which fields kill conversions.
- **Evidence (Property, 2026-06):** `LeadForm.tsx` `validate()` (per-field rules: name length, email regex, UK phone digit floor, conditional message minimum) + `ft.onError(field, ...)` wiring each failure into `form_error` events.
- **Verify (any site):** submit an invalid form; each bad field shows its own message and the form is not sent. Confirm a `form_error`-class event reaches the analytics store (where §3 is live).

#### LD-03 — Honeypot on every public capture surface  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every public form (lead, mini capture, subscribe) MUST carry a hidden honeypot field; a filled honeypot is dropped silently — same success behaviour shown to the bot, nothing stored, nothing signalled.
- **Evidence (Property, 2026-06):** `LeadForm.tsx:86-87` (`company_url`, silent return), same field checked server-side in `api/subscribe/route.ts:46`.
- **Verify (any site):** fill the hidden field programmatically and submit: response is indistinguishable from success, and no row lands.

#### LD-04 — Lead-enquiry consent captured verbatim  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every lead capture MUST record the visitor's data-sharing consent on the lead row as `consent_given`/`consent_text`/`consent_at`, where `consent_text` is the exact disclosure shown at submit time (firm name interpolated per site) and submission is impossible without it (LD-01's payload type). This consent authorises responding to the enquiry and sharing with specialist partners — it MUST NOT be reused to authorise any other purpose (marketing: LD-09; analytics: AN-01).
- **Evidence (Property, 2026-06):** `Property/web/src/components/forms/LeadForm.tsx:49` (interpolated disclosure), `packages/web-shared/lib/supabase-client.ts` (`LeadSubmission` — consent fields required).
- **Verify (any site):** submit a lead; its row carries consent fields whose text matches what was on screen at submit time. Grep: the lead consent flag is read nowhere outside the lead path.

#### LD-05 — Leads stitched to the anonymous journey  `[MUST]` `[Mechanism]` `(Property: compliant)`
Where the site runs first-party analytics, every lead and subscriber write MUST attach the current `visitor_id`/`session_id` so the conversion joins to its pre-conversion journey. The shared columns are nullable, so sites without tracking simply omit them — stitching must never be a precondition for capturing the lead.
- **Evidence (Property, 2026-06):** `LeadForm.tsx:118-120`, `LeadSubmission` optional id fields with the back-compat rationale in comments, `supabase/migrations/20260605000002_add_visitor_id_to_leads.sql` (nullable columns).
- **Verify (any site with §3 live):** submit a test lead; its row carries the same visitor id as the browser's localStorage, and the visitor's journey view shows the conversion.

#### LD-06 — Site-specific fields ride JSONB extras  `[MUST]` `[Mechanism]` `(Property: not yet built)`
Site-specific lead fields (per-niche questions, qualifiers) MUST be carried in a single JSONB `extras` column on the shared `leads` table, populated through the shared submit contract. Universal fields change only via deliberate, nullable migrations. A site MUST NOT add its own columns, and MUST NOT overload an existing universal field with niche-specific or filler values.
- **Evidence (Property, 2026-06):** no `extras` column exists yet in `supabase/migrations/`; the pressure it relieves is already visible — `LeadForm.tsx:110` submits `practice_name: "—"` as filler because the column doesn't fit the property niche.
- **Anti-pattern (do not copy):** filler sentinels (`"—"`) in universal columns; per-site schema columns.
- **Verify (once built, any site):** the migration chain shows a nullable JSONB `extras`; the submit payload type carries it; no site migration adds niche columns to `leads`; no filler sentinels in universal fields.

#### LD-07 — Database first, fail-open pipeline after  `[MUST]` `[Mechanism]` `(Property: compliant)`
The shared database is the system of record: the lead MUST be durably stored before anything else happens. Every post-insert consumer (team notification, spreadsheet mirror, enrichment) MUST hang off the insert as an authenticated webhook (SEC-05) that fails open — a consumer erroring MUST NOT lose, block, or duplicate the lead, and mirrors are convenience copies, never read back as truth.
- **Evidence (Property, 2026-06):** `api/leads/notify/route.ts` (204 no-op on failure, "never blocks lead durability"), `api/leads/sync/route.ts` (Sheets append, lead already safe in DB), pg_net triggers on INSERT.
- **Verify (any site):** break a webhook secret deliberately and submit a test lead: the row still lands, the dashboard still shows it, and the failing consumer logs an error without any user-visible effect. Restore.

#### LD-08 — Enrichment is additive, idempotent, and fail-open  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Automated lead enrichment (AI intent/quality classification, registry lookups) SHOULD write to its own table keyed one-row-per-lead (idempotent on re-delivery), never mutate the lead row it classifies, and degrade to "no enrichment" on any provider error. Enrichment exists to prioritise human follow-up, not to gate it.
- **Evidence (Property, 2026-06):** `api/leads/enrich/route.ts` (separate `lead_enrichment` table, idempotent on `lead_id`, Opus via AI Gateway fail-open, best-effort Companies House lookup), `Property/web/src/lib/ai.ts` + `lib/companies-house.ts` (both return null on any error).
- **Verify (any site):** replay the same enrichment webhook twice — one row. Remove the AI key and submit a lead — lead lands, notification sends, enrichment silently absent.

#### LD-09 — Marketing consent is its own surface  `[MUST]` `[Mechanism]` `(Property: compliant)`
Where the site operates a marketing opt-in (newsletter/nurture), that opt-in MUST capture its OWN consent — its own checkbox and disclosure, its own `consent_given`/`consent_text`/`consent_at` stored on the subscriber row — and MUST NOT be inferred from, or reused as, the lead-enquiry consent (LD-04) or analytics consent (AN-01). A visitor who submits an enquiry has not opted into marketing.
- **Evidence (Property, 2026-06):** `api/subscribe/route.ts` (own consent check + stored text; header comment: "its OWN marketing consent, never the lead-enquiry consent"), subscriber consent columns in `supabase/migrations/20260608000007_nurture_engine.sql`.
- **Verify (any site with marketing opt-in):** opt in and submit a lead as the same visitor: two rows, each carrying its own consent text. Confirm no code path creates a subscriber from a lead submission without an explicit opt-in.

---

## §5 Interactive tool platform (TL)

Scope: the machinery for shipping and operating interactive tools (calculators, checkers). WHICH tools a site carries is `[Inventory]` — niche-driven, never benchmarked against Property's sixteen. HOW tools ship is `[Mechanism]`.

#### TL-01 — One registry is the single source of truth for the fleet  `[MUST]` `[Mechanism]` `(Property: compliant)`
All tools — config-driven and bespoke alike — MUST be entries in one registry module that every derived surface (gallery page, sitemap, navigation, embed gallery) reads. Bespoke tools are a permitted escape hatch but MUST still register with the same metadata contract (slug, name, category, one-liner). Adding a tool is one import plus one array entry; nothing else is hand-updated.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/calculators/registry.ts` (BESPOKE + GENERIC arrays, header comment documents the contract), `app/sitemap.ts:53` (`allTools()`).
- **Verify (any site):** add a dummy registry entry locally and rebuild: it appears in the gallery and the sitemap with no other edits. Grep gallery/sitemap/nav for hardcoded tool slugs: none outside the registry. Revert.

#### TL-02 — Generic tools ship as data, rendered by one shared component  `[MUST]` `[Mechanism]` `(Property: compliant)`
The platform MUST support expressing a complete tool as a single config file — field definitions (type, default, bounds, help, advanced grouping), a pure compute function, page copy, FAQs, embed height — rendered by one shared component on a dynamic route. A new tool of this class requires zero new components and zero new routes.
- **Evidence (Property, 2026-06):** `lib/calculators/tools/*.ts` (11 single-file tools), `lib/calculators/types.ts` (`GenericTool`/`CalcField`/`CalcResult`), `components/calculators/Calculator.tsx`, `app/calculators/[slug]/page.tsx`.
- **Verify (any site):** count files touched to add one config-class tool: exactly two (the config file + the registry import). The shared renderer drives field UI, compute, and result display off the config alone.

#### TL-03 — Domain computation isolated from UI  `[MUST]` `[Mechanism]` `(Property: compliant)`
Tax/financial computation MUST live in pure, framework-free modules (no React, no DOM, no fetch) that components import. This is what makes the figures testable (ED-01) and reusable across page, embed, and any future surface.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/{sdlt,section24,cgt,mtd,incorporation,corpTax,dividendTax}.ts` — pure functions consumed by both bespoke components and generic tool configs.
- **Verify (any site):** grep the compute modules for `react`, `window`, `document`, `fetch`: zero hits. Each exports plain functions callable from a node REPL.

#### TL-04 — Tool inventory is niche-led with a documented quality bar  `[MUST]` `[Inventory]` `(Property: compliant)`
The site maintains a registry of tools chosen for ITS niche, governed by a written quality bar: every figure traces to a documented house position or official source, honest limitation notes per tool, no thin duplicates. The standard mandates this machinery and bar — not any count and not any overlap with another site's fleet. "Missing Property's X calculator" is never a finding; "has no documented source for its figures" always is.
- **Evidence (Property, 2026-06):** `registry.ts:21-22` ("every figure traces to docs/property/house_positions.md or HMRC. No pricing/fees, no thin duplicates, honest disclaimers"), `docs/property/house_positions.md`.
- **Verify (any site):** the registry (or its doc) states the quality bar; pick two tools and trace one figure each to its documented source; each tool's result carries its limitation note.

#### TL-05 — Embeddable tool surface with a self-serve gallery  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Tools SHOULD be embeddable on third-party sites: a chrome-free route per tool (no header/footer/CTAs), an auto-resize protocol (postMessage child → parent listener snippet), the SEC-03 frameability exception scoped to that prefix, attribution + lead path back to the site, and a self-serve gallery page where a partner copies a working snippet. Embeds are an off-site authority asset (backlinks), which is why this is a capability and not an instance.
- **Evidence (Property, 2026-06):** `app/embed/[slug]/page.tsx`, `components/embed/EmbedAutoResize.tsx` + `EmbedSnippet.tsx`, `app/embed/page.tsx` (snippet gallery), embed-aware analytics envelope (`is_embed`/`embed_slug` in §3).
- **Verify (any site):** paste a gallery snippet into a local HTML file on another port: the tool renders, resizes to content, and its events arrive flagged as embed traffic.

#### TL-06 — Tools fully instrumented in the shared event vocabulary  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every tool MUST emit the standard tool lifecycle events (view → input change → computed → result viewed, plus copy/share) through §3's pipeline, so §9's per-tool conversion panels work without per-tool analytics code. Instrumentation lives in the shared renderer/platform once, not per tool.
- **Evidence (Property, 2026-06):** `calc_view`/`calc_input_change`/`calc_computed`/`calc_result_viewed`/`calc_copy`/`calc_share` in `lib/analytics/types.ts`, emitted from the shared calculator components.
- **Verify (any site):** use any tool with devtools open: the lifecycle events fire in order, carrying the tool slug, with no tool-specific tracking code in its config.

#### TL-07 — Premium/overlay features behind a separate flagged registry  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Gated or premium tool features SHOULD live in their own registry with per-entry enable flags, disabled by default, layered onto the public fleet without touching its indexable pages, sitemap, or registry. Rollout is a flag flip, rollback likewise.
- **Evidence (Property, 2026-06):** `lib/calculators/premium/registry.ts` (separate registry, all disabled in Phase A), `components/calculators/premium/PremiumUpgrade.tsx` (client-side island gating).
- **Verify (any site using overlays):** with all flags off, the public fleet's HTML and sitemap are byte-identical to a build without the premium module; flipping one flag changes only that tool's page.

---

## §6 Content engine (CT)

Scope: the machinery that turns a content corpus into ranking-grade pages. The corpus itself — topics, volume, categories — is `[Inventory]`, owned by each site's content program (see `docs/_engines/NETNEW_PROGRAM.md` / `REWRITE_PROGRAM.md`). The machinery below is `[Mechanism]`.

#### CT-01 — File-based content store with structured frontmatter  `[MUST]` `[Mechanism]` `(Property: compliant)`
Long-form content MUST live as version-controlled files with typed frontmatter covering: identity (slug, title, h1), metadata (metaTitle, metaDescription, summary, canonical override), taxonomy (category), provenance (date, author, dateModified, reviewedBy/reviewedAt), and enhancement payloads (faqs, howToSteps, custom schema). One parser module is the only reader; pages never parse files themselves.
- **Evidence (Property, 2026-06):** `Property/web/content/blog/*.md`, `Property/web/src/lib/blog.ts` (single parser), `src/types/blog.ts` (`BlogFrontmatter`).
- **Verify (any site):** all content access goes through the one lib module (grep pages for direct `gray-matter`/`fs.readFile` of content: only the lib); the frontmatter type covers the field classes above.

#### CT-02 — Frontmatter validated at build, loudly  `[MUST]` `[Mechanism]` `(Property: partial)`
A content file with missing or malformed required frontmatter MUST fail the build with the filename and field named — not render with silent defaults. Generated content (the corpus is machine-assisted) makes this the main defence against a malformed file shipping at scale.
- **Evidence (Property, 2026-06):** `lib/blog.ts:14-16` throws on missing `slug`/`title` only; every other field silently defaults (`date: ""`, `category: "General"`, empty `metaDescription`), so a post missing its date or description ships quietly.
- **Anti-pattern (do not copy):** `fm.date ?? ""` — defaulting required editorial fields to empty strings.
- **Verify (any site):** strip the date (or another required-by-policy field) from one content file and build: the build fails naming the file and field. Revert.

#### CT-03 — Taxonomy routes derived from content  `[MUST]` `[Mechanism]` `(Property: compliant)`
Category/hub routes MUST be derived from the frontmatter taxonomy (dynamic segments enumerating actual categories), never hand-registered, so adding content in a new category creates its hub automatically and an emptied category disappears. Unknown slugs MUST 404 rather than render at runtime (e.g. via locked dynamic params).
- **Evidence (Property, 2026-06):** `app/blog/[category]/[slug]/page.tsx` (`dynamicParams = false`), `lib/blog.ts` `getAllCategories()` feeding both routes and sitemap.
- **Verify (any site):** add a post with a brand-new category and rebuild: its hub page and sitemap entry exist with no route edits. Request a non-existent slug: 404.

#### CT-04 — Reader apparatus generated from the content  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Long-form pages SHOULD carry reader apparatus generated from the document itself — table of contents from headings (with stable heading ids injected at parse), related-content block from taxonomy, reading progress — implemented once in the renderer, zero per-article effort.
- **Evidence (Property, 2026-06):** `lib/markdown-utils.ts` (`addHeadingIds` at parse), `components/blog/{TableOfContents,ReadingProgress,BlogPostRenderer}.tsx`, `lib/blog.ts` `getRelatedPosts()`.
- **Verify (any site):** open any two articles: TOC entries anchor-link to headings, related block populated by category — and neither article's source file contains apparatus markup.

#### CT-05 — Structured data per page type, from builders  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every page type MUST emit its appropriate JSON-LD (articles: Article/BlogPosting with provenance; FAQs: FAQPage from the frontmatter payload; how-tos: HowTo; all hierarchies: BreadcrumbList; org-level: Organization/ProfessionalService) through shared builder functions — never hand-written JSON in pages, so a schema fix lands corpus-wide.
- **Evidence (Property, 2026-06):** `Property/web/src/lib/schema.ts` (builders), `lib/organization-schema.ts`, `components/ui/Breadcrumb.tsx` (breadcrumb + its JSON-LD as one unit).
- **Verify (any site):** run three page types through a structured-data validator: each emits its type validly; grep pages for inline `"@context"` literals — only builder calls.

#### CT-06 — Dynamic social images  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Shareable pages SHOULD get generated OG images (title + context rendered at request) rather than one static fallback, via a single endpoint/builder used by every page type.
- **Evidence (Property, 2026-06):** `app/api/og/route.tsx` (edge runtime), `buildOgImageUrl()` usage in blog + calculator metadata.
- **Verify (any site):** fetch the OG image URL from two different pages' metadata: distinct images carrying each page's title.

#### CT-07 — Corpus is niche-led, with provenance fields in use  `[MUST]` `[Inventory]` `(Property: compliant)`
The site maintains a content corpus chosen for ITS niche under its own content program, with the gold-standard quality bar applied (genuinely authoritative, fact-checked against the site's house positions, voice-clean per `docs/_engines/VOICE_STANDARD.md`). The E-E-A-T provenance machinery (reviewedBy, reviewedAt, dateModified) MUST be populated where claimed, not decorative. Corpus size and topic mix are never benchmarked against Property's.
- **Evidence (Property, 2026-06):** 420 live pages under `content/blog/` governed by `docs/property/STATE.md` + house positions; frontmatter provenance rendered in `BlogPostRenderer.tsx` and emitted in schema.
- **Verify (any site):** pick two posts claiming review provenance: the rendered page and JSON-LD carry it, and the site's documented fact base (house positions or equivalent) supports the figures cited.

---

## §7 SEO & discoverability (SEO)

Scope: how the site presents itself to search engines and AI crawlers. Builds directly on §5/§6 registries — discoverability surfaces are derived, not maintained.

#### SEO-01 — Sitemap derived from the registries  `[MUST]` `[Mechanism]` `(Property: compliant)`
The sitemap MUST be generated at build from the live sources of truth — tool registry, content parser (posts + categories), config locations — so shipping inventory updates it automatically. Each entry carries lastModified, changeFrequency, priority, and locale alternates. A short hand-list is permitted ONLY for genuinely static tier-1 routes, and any new static route must be added there (an acceptable, visible cost; dynamic inventory must never be hand-listed).
- **Evidence (Property, 2026-06):** `app/sitemap.ts` — `allTools()`, `getAllPosts()`, `getAllCategories()`, `siteConfig.locations`, plus the static tier-1 array.
- **Verify (any site):** add a registry tool or content file and rebuild: it appears in `/sitemap.xml` with no sitemap edit. Diff the sitemap against the route inventory: no dynamic class of page is missing.

#### SEO-02 — Deliberate crawler policy including AI crawlers  `[MUST]` `[Mechanism]` `(Property: compliant)`
robots MUST be generated code (reading the site config for host/sitemap), with an explicit named allow-list of the AI and search crawlers the business wants — named rules beat wildcards because several bots only honour their own entry — and explicit disallows for utility pages. AI-engine discoverability (GEO) is a strategic channel, so this is policy, not boilerplate.
- **Evidence (Property, 2026-06):** `app/robots.ts` — 50+ named crawlers (Google, OpenAI, Anthropic, Perplexity, Meta, Bing, Mistral, Cohere, CCBot, social preview bots...), `/thank-you` disallowed, sitemap + host from config.
- **Verify (any site):** fetch `/robots.txt`: named AI-crawler rules present, utility pages disallowed, sitemap URL matches the site's canonical host from config.

#### SEO-03 — Canonical + locale alternates on every indexable page  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every indexable page MUST emit a canonical URL (built from the config site URL, overridable per content item for syndication) and locale alternates (hreflang + x-default). The site URL comes from one place (PF-01's config/env), so a staging deploy can't leak staging canonicals.
- **Evidence (Property, 2026-06):** root metadata in `app/layout.tsx` (en-GB + x-default), per-route canonicals from `siteConfig.url`, frontmatter `canonical` override in `lib/blog.ts`.
- **Verify (any site):** view source on three page types: canonical present, absolute, on the production host; a content item with a canonical override emits it.

#### SEO-04 — Metadata generated per page type from config + templates  `[MUST]` `[Mechanism]` `(Property: compliant)`
Page metadata (title template, description, OpenGraph, Twitter card, verification tokens) MUST be generated from the site config and per-type formulas with per-item overrides (frontmatter metaTitle/metaDescription) — never hardcoded per page, so the meta strategy is tunable corpus-wide.
- **Evidence (Property, 2026-06):** `app/layout.tsx` (title template, OG defaults, verification from `niche.seo`), per-page `generateMetadata` reading frontmatter overrides.
- **Verify (any site):** change the config tagline/description and rebuild: default metadata updates everywhere; an item-level metaTitle still wins on its own page.

#### SEO-05 — Noindex discipline for utility and private surfaces  `[MUST]` `[Mechanism]` `(Property: compliant)`
Conversion-utility pages (thank-you), gated/duplicate surfaces, and private consoles MUST be kept out of the index by the appropriate tool: robots disallow for utility pages, per-page noindex metadata for private/duplicate surfaces (which lets crawlers see the directive), and authentication for anything sensitive (robots disallow alone ADVERTISES a path, it does not protect it).
- **Evidence (Property, 2026-06):** `/thank-you` disallowed in `robots.ts`; admin pages emit `robots: {index:false, follow:false}` and 404 without the key rather than relying on robots.txt.
- **Verify (any site):** check the thank-you page (disallowed or noindexed), the admin console (noindex + auth, NOT robots-advertised), and any embed/gate duplicates (canonical or noindex resolves the duplication).

---

## §8 Engagement & conversion systems (EN)

Scope: the systems that turn visits into leads and subscribers — behavioural targeting, experimentation, gated assets, and email nurture. WHICH engagement surfaces and sequences a site runs is per-site; the operating discipline below is not. Everything here presumes §3 (events) and §4 (consent surfaces).

#### EN-01 — Central intent state drives engagement surfaces  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Behavioural engagement surfaces (e.g. exit-intent, scroll-depth prompts, returning-visitor recognition) SHOULD be driven by one client-side intent provider that tracks the visitor's state (scroll, tenure, interactions, visit class, derived topic) — not by each surface re-implementing its own triggers. Every show/click/dismiss MUST be tracked (the `personalization_*` / `exit_intent_shown` event class), so §9 can prove whether a surface earns its interruption.
- **Evidence (Property, 2026-06):** `components/intent/IntentProvider.tsx` (single context), `lib/intent/{engine,deriveTopic,taxonomy}.ts`, surfaces `ExitIntentModal`/`DeepScrollModal`/`ReturningBar` subscribing to it, personalization events in `lib/analytics/types.ts`.
- **Verify (any site with engagement surfaces):** all triggering reads one provider (grep surfaces for their own scroll/tenure listeners: none); trigger a surface and confirm its shown/dismissed events land.

#### EN-02 — Experiments: deterministic, previewable, automatically stamped  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
A/B variants SHOULD be assigned deterministically from the visitor id (stable across sessions, no flicker re-rolls), be hydration-safe (control on server render, variant after mount), support a QA override (URL param forcing a variant for preview), and stamp the active experiment context onto EVERY analytics event automatically — so any metric can be cut per-arm without per-experiment instrumentation.
- **Evidence (Property, 2026-06):** `components/experiments/useExperiment.ts` (deterministic `assignVariant(visitorId, key)`, `?ab=key:variant` override, null-until-mount), `lib/experiments/active.ts` consumed by `track.ts` (`activeExperimentString` on the envelope).
- **Verify (any site running experiments):** the same visitor gets the same variant across reloads; the documented QA override forces a variant for preview; any event row captured during an experiment carries the arm.

#### EN-03 — Gated resources: registry-driven, durable lead first, fulfilment second  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Lead-magnet gates SHOULD follow the same discipline as everything else: assets declared in a registry with enable flags; artefacts generated reproducibly by script (not hand-made binaries); the gate captures a consented lead through LD-01 BEFORE fulfilment; fulfilment (email delivery + inline unlock) is the fail-open second step, rate-limited per SEC-06.
- **Evidence (Property, 2026-06):** `lib/resources/registry.ts` (per-topic assets + enabled flags), `scripts/resources/generate-xlsx.ts` (reproducible artefacts), `components/resources/ResourceGate.tsx`, `api/resources/deliver/route.ts`.
- **Verify (any site with gates):** the gate submits a lead (visible in the dashboard) before any download; the artefact regenerates from script; a disabled registry entry removes its gate without code edits.

#### EN-04 — Marketing email is dormant by default  `[MUST]` `[Mechanism]` `(Property: compliant)`
The nurture engine MUST NOT send marketing email until the operator explicitly arms it (a deliberate secret/flag whose absence means: record opt-ins, send nothing). Arming is a sign-off act, not a side effect of deploying code. This is what makes it safe to ship the engine ahead of the decision to email people.
- **Evidence (Property, 2026-06):** `api/nurture/send/route.ts` (refuses without `CRON_SECRET`), `api/subscribe/route.ts:122-126` (welcome email sent only when armed; opt-in still recorded when dormant).
- **Verify (any site):** with the arming secret unset, opt in: subscriber row lands, zero emails leave. Set it: the schedule runs.

#### EN-05 — Sends are idempotent: claim before send, release on failure  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every automated email MUST be guarded by an atomic claim on its (recipient, sequence, step) identity in a send log BEFORE the provider call — a unique index makes the claim race-safe, a duplicate run sees the claim and skips, and a transient provider failure releases the claim for clean retry. Cron re-runs, webhook replays, and concurrent invocations can never double-email a subscriber or silently drop a step.
- **Evidence (Property, 2026-06):** `lib/nurture/send.ts:43-78` (claim via `onConflict ... ignoreDuplicates`, release on Resend error), UNIQUE (subscriber_id, sequence, step) in `supabase/migrations/20260608000007_nurture_engine.sql`.
- **Verify (any site):** run the send job twice in quick succession for the same due step: one email, one send-log row. Simulate a provider error: the claim is released and the next run retries.

#### EN-06 — Compliant, measurable marketing email  `[MUST]` `[Mechanism]` `(Property: partial)`
Every marketing email MUST carry: a per-subscriber unsubscribe token link plus RFC 8058 one-click unsubscribe headers; UTM-tagged CTAs so visits attribute to the sequence/step; and delivery feedback (open/click/bounce/complaint webhooks) updating the send log and subscriber status, so bounced/complained addresses are never mailed again. Operational identity (from-address, reply-to, site URL) MUST come from config/env, never hardcoded fallbacks.
- **Evidence (Property, 2026-06):** `lib/nurture/send.ts` (List-Unsubscribe headers, token URL), `lib/nurture/sequence.ts` (UTM-tagged CTAs), `api/nurture/events/route.ts` + `subscribers.status` (bounced/complained excluded from sends). Partial: `send.ts:15,27-35` hardcodes the site URL and from-name as fallbacks.
- **Anti-pattern (do not copy):** hardcoded site-URL / from-name fallback literals in the send path — they silently send another site's identity when an env var is missing.
- **Verify (any site):** inspect a sent email's headers and links (one-click unsubscribe + token + UTMs); mark a subscriber bounced and confirm the next run skips them.

---

## §9 Observability & admin (OB)

Scope: the operator's window into §3/§4/§8 — the internal console and the query discipline behind it. Consumes everything; depended on by nothing, which is why it is last of the systems sections.

#### OB-01 — Private console behind real authentication  `[MUST]` `[Mechanism]` `(Property: non-compliant)`
The internal dashboard MUST be server-rendered with the service role, noindexed, and gated by authentication that does not put the secret in the URL. Query-param keys leak through browser history, referrer headers on any outbound click, and access logs; the standard is a header/cookie/session gate (or platform auth). Wrong/missing credentials return not-found or unauthorized.
- **Evidence (Property, 2026-06):** `app/admin/analytics/page.tsx` — gated by `?k=<ADMIN_DASHBOARD_KEY>` query param (404 on mismatch, noindex, server-rendered: the rest of the discipline is right).
- **Anti-pattern (do not copy):** `?k=` secret in the URL.
- **Verify (any site):** open the dashboard route without credentials: not-found/unauthorized. Confirm the credential travels in a cookie/header, not the query string, and the page emits noindex.

#### OB-02 — Typed query layer over named views  `[MUST]` `[Mechanism]` `(Property: compliant)`
Every dashboard panel MUST read through a typed server-side query function wrapping a named SQL view — never raw table queries scattered through components. The views are the analytics contract: panels stay thin, queries are reviewable in one module, and the same views serve any future consumer (alerts, exports).
- **Evidence (Property, 2026-06):** `lib/analytics/server/adminData.ts` (~20 typed functions over `vw_*` views: funnel, calculator conversion by placement, field dropoff, channel conversion, lead intent mix, nurture funnel...), views defined in the analytics migrations.
- **Verify (any site):** grep dashboard components for direct table names: none — only the query module; each function's return type is declared; each maps to a `vw_*` view in migrations.

#### OB-03 — The console answers the conversion question end-to-end  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
The dashboard SHOULD let the operator walk the whole funnel without leaving it: sessions → engaged → tool/content engagement → form start → lead, cut by day, channel, country, and tool; plus lead quality context (enrichment mix) and list health (subscriber/nurture funnels) where those systems run. The test is whether "what changed and where do we lose people?" is answerable from panels alone.
- **Evidence (Property, 2026-06):** `app/admin/analytics/DashboardTabs.tsx` (Overview/Visitors/Experiments/Behaviour/Conversion), `vw_web_funnel_daily_v2` (true nested funnel), channel + visits-to-conversion + lead-intent panels.
- **Verify (any site):** from the dashboard alone, answer: yesterday's sessions, the biggest funnel drop-off stage, the best-converting channel, and the top tool by lead rate.

#### OB-04 — Per-visitor journey drill-down  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
From any aggregate, the operator SHOULD be able to drill to the individual visitor: full session chain, event timeline, device/referrer attributes, and the linked lead once converted (LD-05's stitching made visible). Aggregates say what; journeys say why.
- **Evidence (Property, 2026-06):** `app/admin/analytics/visitor/[visitorId]/page.tsx`, `vw_visitor_journey`, top-visitors and leads panels linking through.
- **Verify (any site):** click through from a lead row to its visitor: the pre-conversion journey renders session by session.

#### OB-05 — Friction and errors are first-class panels  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
The console SHOULD surface what is breaking or frustrating: client-side JS errors grouped by message/source (not a per-page dump), rage/dead clicks by page, and form-field dropoff — feeding fixes, not just reporting. This closes the loop that makes the event vocabulary's friction events (§3) worth collecting.
- **Evidence (Property, 2026-06):** `vw_client_errors`, `getUxFriction()`/`getFormFieldDropoff()` in `adminData.ts`, Behaviour tab panels.
- **Verify (any site):** throw a test error in the browser on the live site; it appears grouped in the errors panel. Field-level abandonment shows per form field.

#### OB-06 — Real-user web vitals land in the site's own store  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Core Web Vitals SHOULD be sampled from real users into the site's own analytics (a `web_vital` event), not only into a vendor dashboard, so performance regressions are queryable alongside conversion data and survive vendor churn. Vendor tools (Speed Insights) may run in parallel.
- **Evidence (Property, 2026-06):** `web_vital` in the event allowlist, `components/analytics/WebVitals.tsx` (`web-vitals` package → track()), `@vercel/speed-insights` alongside.
- **Verify (any site):** load a page and confirm a `web_vital` event row lands carrying the metric name and value.

---

## §10 Engineering & design discipline (ED)

Scope: the cross-cutting habits that make everything above stay true over time, plus the design-discipline axis. Visual identity is per-site and out of scope: **no capability in this standard may produce a look-and-feel finding** — an audit that says "should look more like Property" has misread the document.

#### ED-01 — Automated tests exist and gate changes  `[MUST]` `[Mechanism]` `(Property: non-compliant)`
The site MUST have an automated test suite that runs in CI (or a pre-merge script) and blocks regressions. Minimum bar: unit tests over the pure domain compute modules (TL-03 made them trivially testable — tax figures are exactly the thing that must not silently drift when rates change), plus smoke coverage of the lead submit contract and the ingest sanitiser. This is the single largest gap in the benchmark: a fleet of tax calculators with zero tests over the tax maths.
- **Evidence (Property, 2026-06):** no `*.test.ts`/`*.spec.ts` anywhere under `Property/web/`, no test runner in `package.json`, no CI workflow in `.github/`.
- **Anti-pattern (do not copy):** relying on TypeScript strictness and manual QA as the only regression net for financial computation.
- **Verify (any site):** a test command exists and runs green; break a tax band constant in a compute module: a test fails.

#### ED-02 — Meta-principle: every enumerable fleet has one registry  `[MUST]` `[Mechanism]` `(Property: compliant)`
Anything that exists as a fleet (tools, gated resources, premium overlays, nurture sequences, navigation) MUST have exactly one source-of-truth module, with all derived surfaces reading it. The test for a new feature: "if I add the Nth instance, how many files change?" — the right answer is 1-2, and never includes a derived surface.
- **Evidence (Property, 2026-06):** `lib/calculators/registry.ts`, `lib/resources/registry.ts`, `lib/calculators/premium/registry.ts`, `lib/nurture/sequence.ts`, nav from `niche.config.json`.
- **Verify (any site):** pick two fleets; adding an instance touches only the registry (+ the instance file). Grep derived surfaces for hand-maintained copies of fleet membership: none.

#### ED-03 — Meta-principle: external dependencies fail open  `[MUST]` `[Mechanism]` `(Property: compliant)`
No third-party dependency (AI provider, email service, spreadsheet mirror, registry API, replay tool) may break a user-facing action. The user's action durably completes against the site's own database first; integrations enhance afterwards and degrade to absence on error — logged, never thrown back to the page. Unconfigured means inert, not broken.
- **Evidence (Property, 2026-06):** `lib/ai.ts` + `lib/companies-house.ts` (null on any error), `api/leads/notify/route.ts` (204 no-op), `Clarity.tsx` (inert without id), LD-07's pipeline ordering.
- **Verify (any site):** unset every optional integration env var and run the build + a lead submit + a page browse: everything user-facing works; only the enhancements are absent.

#### ED-04 — Decisions documented at the point of surprise  `[SHOULD]` `[Mechanism]` `(Property: compliant)`
Where code embodies a non-obvious decision — a deliberately disabled protection, a consent posture, a cross-origin stitching choice, an idempotency protocol — the WHY (including the incident that taught it, dated) SHOULD be written at that point in the code. The next engineer's first instinct ("why isn't BotID on this route? I'll add it") must hit the explanation before the footgun.
- **Evidence (Property, 2026-06):** `lib/analytics/server/bots.ts` (the BotID/sendBeacon incident, dated 2026-06-08), `lib/analytics/consent.ts` (posture decision + revert path), `lib/analytics/ids.ts` (stitching decision "locked"), `lib/nurture/send.ts` (claim protocol).
- **Verify (any site):** find three deliberately-surprising behaviours (a disabled check, a default-on posture, an intentional no-op); each carries its rationale in place, not in a doc nobody opens.

#### ED-05 — Canonical design tokens, per-site values  `[MUST]` `[Design]` `(Property: compliant)`
Every site MUST define the canonical token set (`--brand-primary`, `--brand-primary-strong`, `--brand-on-primary`, `--ink`, `--muted`, `--surface`, `--border`, `--background`) in its global stylesheet, mapped to its OWN brand values. Shared/workspace components MUST style exclusively through canonical tokens — never site-specific variables or hardcoded colours — so one component renders correctly under six brands. The token VALUES are identity (out of scope); the token CONTRACT is the standard.
- **Evidence (Property, 2026-06):** `Property/web/src/app/globals.css` (emerald mapped to canonical tokens; legacy aliases kept for back-compat), `packages/web-shared/components/ui/layout-utils.ts` (canonical-token classes), policy recorded in `docs/MULTI_SITE_INFRASTRUCTURE.md`.
- **Verify (any site):** the global stylesheet defines the full canonical set; grep workspace components for site-specific tokens or hex literals: none.

#### ED-06 — Written conventions where consistency is load-bearing  `[SHOULD]` `[Design]` `(Property: compliant)`
Where the codebase depends on convention (class naming, component patterns, content voice), the convention SHOULD be written down in the repo and referenced from work that touches it — discipline is auditable only when stated.
- **Evidence (Property, 2026-06):** `Property/web/CLASS_NAMING_CONVENTIONS.md`, `docs/_engines/VOICE_STANDARD.md` (corpus voice), `docs/MULTI_SITE_INFRASTRUCTURE.md` (token policy).
- **Verify (any site):** the conventions its code visibly follows are written somewhere a new contributor would find; spot-check two recent files against them.

#### ED-07 — Accessibility and performance floors  `[MUST]` `[Design]` `(Property: compliant)`
Whatever the visual identity, every site MUST clear the same floors: visible focus states and adequate touch targets on all interactive elements; semantic landmarks and labelled form fields; optimized images (framework image pipeline, no raw `<img>` for content images); self-hosted/next-font loading (no layout-shifting font swaps); and performance regressions treated as bugs, with real-user vitals monitored where the §3 pipeline runs (OB-06). Identity decides what it looks like; discipline decides that it is usable and fast.
- **Evidence (Property, 2026-06):** focus-ring utilities in `packages/web-shared/components/ui/layout-utils.ts`, `min-h-12 touch-manipulation` field classes in `LeadForm.tsx`, `next/image` + remotePatterns in `next.config.ts`, `next/font` (Plus Jakarta Sans) in `layout.tsx`, WebVitals capture.
- **Verify (any site):** keyboard-tab through the lead form (visible focus on every control, all fields labelled); run Lighthouse on two page types: no image/font layout-shift findings; confirm vitals are being captured.

---

*End of capability sections. Total: 71 capabilities (PF 7, SEC 8, AN 9, LD 9, TL 7, CT 7, SEO 5, EN 6, OB 6, ED 7).*
