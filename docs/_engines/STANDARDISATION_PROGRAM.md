# The Standardisation Program — orientation page (START HERE)

**Status: COMPLETE, 2026-06-11.** Phases 0 through G all closed. Every app in the estate — six niche sites plus the unified operator console — runs on shared machinery in `packages/web-shared/`, deployed and live-verified. This page is the map; the detail lives in the per-phase specs alongside it.

## What exists now (and where it lives)

| Capability | Shared home | Adopted by |
|---|---|---|
| First-party analytics SDK (consent, ids, tracking, bots, web vitals) | `packages/web-shared/analytics/` | all 6 sites (frozen storage prefixes: ptp/hd/dfp/ma/afl/aff) |
| Calculator/tools platform (registry, renderer, embeds, golden-test discipline) | `packages/web-shared/tools/` | all 6 sites; every tool has golden tests pinned to verified figures |
| Operator console (query layer, panels, cookie auth) | `packages/web-shared/console/` | unified console app + per-site `/admin/analytics` mounts (Property's deleted — it uses the unified console) |
| **Unified estate dashboard** | `console/web` → **https://estate-console.vercel.app** | one login, all-site overview + per-site drill-down incl. experiments cards + interactive trends |
| Nurture/newsletter engine (claim-before-send, double opt-in, Svix, dormancy) | `packages/web-shared/nurture/` | generalist, agency, Property — ALL DORMANT/collect-only (activation is a parked operator decision) |
| Experiments engine (deterministic assignment, exposure tracking, per-site registries) | `packages/web-shared/experiments/` | Property (6 live experiments) + generalist (`calc_promo_inline` live); others have empty registries — composition is 2 lines when a real experiment arrives. **Read `EXPERIMENTS.md` before touching.** |
| Schema/JSON-LD builders + reader apparatus + RSS/llms factories | `packages/web-shared/schema/` + `content/` | adoption varies; per-site schema re-point is a PARKED decision (output divergence is SEO-sensitive) |
| Shared hardening (config validator, security headers, frontmatter gates) | `packages/web-shared/lib/` | all sites |
| Lead contract (`LeadSubmission` + JSONB `extras`, consent rules) | `packages/web-shared/lib/supabase-client.ts` | all sites; consent ONLY from rendered checkboxes — hard rule |

**Data layer:** one Supabase project (`dhlxwmvmkrfnmcgjbntk`); site-keyed tables (`web_sessions`/`web_events`/`leads`/`subscribers`/`nurture_*`) + 28 site-parameterised `vw_*` views; `sites` registry table drives the console's site list. Migrations in `supabase/migrations/`, applied via the Management API and recorded in `schema_migrations`.

**Load-bearing oddity:** Property's deployment hosts the lead notify/enrich pipeline for ALL six sites — see `CENTRAL_LEAD_PIPELINE.md` before touching Property's deploys or `api/leads/**`.

## The record (read in this order if you need depth)

1. `PROPERTY-CAPABILITY-STANDARD.md` — the frozen 71-capability standard everything was audited against.
2. `STANDARDISATION_PHASE_A_SPEC.md` → `..._G_SPEC.md` — execution logs per phase (A: CI+SDK · B: tools/console/figures · C: leads extras + nurture + pipeline decision · D: 4-site rollout · E: unified console · F: Property adoption · G: experiments). Each spec's log records what was verified, what broke, and the lessons.
3. `EXPERIMENTS.md` — how to run experiments + when results mean anything.
4. `docs/<site>/TOOLS.md` — per-site calculator quality bars, every figure traced to source.

## Working disciplines that are now LAW (learned the hard way; see phase logs)

- `next build` is the gate, never tsc alone (RSC serialization). Tests count only when the site's own `npm test` runs them.
- Golden tests pin existing behaviour BEFORE refactors; figure changes are deliberate named commits, never silent.
- Live-DB facts over migration-file assumptions (column names have burned us twice: `web_sessions.started_at`, `web_events.ts`).
- Consent fields only from rendered, user-operated checkboxes; stored text byte-matches the visible label.
- **Live probes after deploy are mandatory for identity/experiment work** — two SDK bugs shipped green through unit tests + builds and were caught only by identity-seeded browser probes (`scripts/g1_continuity_probe.mjs`, `g2_*_probe.mjs`, `an01_browser_pass.mjs`, `f2_http_harness.mjs` — all reusable).
- Deploys from repo root with `VERCEL_PROJECT_ID`/`VERCEL_ORG_ID` env override; never from inside a site dir. Re-check `gh pr checks` immediately before merge after any late commit.

## Parked items (deliberate, user-gated)

- **Newsletter activation**: engines dormant estate-wide; needs CRON_SECRET arming + Resend webhook re-points when signups justify it.
- **Schema re-point**: shared builders emit different JSON-LD than per-site local builders; estate-wide decision window pending.
- **Per-site console retirement**: redundant since the unified console; deletion is the user's call.
- **GA4 keep-or-drop** on dentists/medical/solicitors (first-party runs alongside; first-party sees ~4x GA4).

## NEXT: contractors-ir35 launch (the first site BORN on the grid)

State: scaffolded at `contractors-ir35/` — empty niche config, no topic seed, no Vercel project, key `contractors` NOT yet in the `sites` registry or `leads.source` CHECK (verify against the LIVE db, not this doc).
The path (each step has a proven template now):
1. Niche config (validator enforces shape) + content strategy + topic seed — the niche/product decisions are the real work.
2. Register the site key in the live DB FIRST (sites registry + leads CHECK — the track route's FK rejects unregistered keys by design).
3. Compose the shared machinery (analytics with a fresh frozen prefix, tools, console mount, LeadForm contract) — mirror any Phase D adoption diff, e.g. PR #12 (solicitors).
4. CI matrix entry + Vercel project (root-dir pattern in the Phase E/F logs) + env set + deploy + the standard live battery.
5. It appears in the estate console automatically (registry-driven).
Content programs (net-new waves, rewrite engine) onboard per `ENGINE_MAP_AND_ONBOARDING.md` once the site is live.
