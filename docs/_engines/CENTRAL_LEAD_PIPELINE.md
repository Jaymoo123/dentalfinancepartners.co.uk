# Central lead pipeline — designated host: Property (GAP-6 decision record)

**Decision (user, 2026-06-11):** option (a), documentation-only. Property's production deployment is the *designated central host* for the estate's post-insert lead consumers. This document makes the dependency explicit; nothing was moved or rewritten.

## The dependency

Every site's lead lands in the shared `leads` table (the system of record, LD-07). Three INSERT triggers then run (verified live 2026-06-11):

| Trigger | Mechanism | Target |
|---|---|---|
| `stitch_lead_to_session_trg` | pure SQL (no network) | sets `web_sessions.lead_id` for the submitting visitor's session |
| `leads_to_email_trg` | pg_net HTTP POST | `https://www.propertytaxpartners.co.uk/api/leads/notify` |
| `leads_to_enrich_trg` | pg_net HTTP POST | `https://www.propertytaxpartners.co.uk/api/leads/enrich` |

A Google Sheets mirror (`/api/leads/sync`) exists on the same host (built, pending Google-side setup).

**Plainly: lead notification emails and AI enrichment for ALL SIX sites are processed by code deployed inside Property's Vercel app.** A lead is never lost if the host is down (LD-07 fail-open: the row is durable before any webhook fires, and pg_net failures don't roll back the insert), but notifications/enrichment for any site silently stop if:

- Property's deployment is broken or rolled back to a build missing these routes
- `www.propertytaxpartners.co.uk` changes domain or DNS
- the secrets below are removed from Property's Vercel env

## Operational facts

- Routes (in `Property/web/src/app/api/leads/{notify,sync,enrich}/route.ts`): authenticate via shared secret with `crypto.timingSafeEqual`, return 503 (refuse, not process) when their secret is unconfigured, fail open per LD-07.
- Env vars that arm them (Property's Vercel project): the leads webhook secret (shared with the pg_net trigger bodies), `RESEND_API_KEY` (notify), AI Gateway + Companies House keys (enrich), Google service-account creds (sync, pending).
- Email routing rule: notify CCs the partner on real leads from every site **except Property** — Property's own leads (`source = "property"`) go to the internal inbox only, no partner CC, and their email omits the "Forward to Reflex" banner. The rule is `Property/web/src/lib/lead-routing.ts` (`resolveLeadCc`), tunable via `LEADS_NOTIFY_CC_EXCLUDE_SOURCES` (defaults to `"property"`); the `GET /api/leads/notify` health probe reports the live `ccExcludeSources`. This is also why test leads must never traverse this pipeline (Phase C guardrail: trigger-skipped inserts only).
- Enrichment writes to its own `lead_enrichment` table, idempotent on `lead_id` (LD-08) — never mutates the lead row.

## Health check

If leads appear in the dashboard but notification emails stop arriving:
1. `SELECT id, created_at FROM leads ORDER BY created_at DESC LIMIT 5` — rows landing? (If not, the problem is upstream, not this pipeline.)
2. Is `https://www.propertytaxpartners.co.uk/api/leads/notify` reachable (expect 401/405 to an unauthenticated probe, NOT 404)? A 404 means a Property deploy dropped the route.
3. Check Property's Vercel env still carries the secrets; a 503 from the route means the secret is unset.
4. pg_net failures are logged in the `net._http_response` table in Supabase.

## If the dependency ever needs to move (the deferred option b)

The re-point path, in order, smallest-blast-radius first:
1. Lift the three handlers into `packages/web-shared` as factories (touches Property files — needs an approved Property write window).
2. Stand up the neutral host (Supabase Edge Functions or a dedicated infra app) wrapping the same factories; arm with the same secrets.
3. `CREATE OR REPLACE` the two pg_net trigger functions with the new URLs (single migration, instantly reversible by re-running with the old URLs).
4. Only after the new host has processed real leads, remove the secrets from Property's env.

Until then: **treat Property's prod deployment as shared infrastructure.** Its deploy gate protects six sites' notifications, not one.
