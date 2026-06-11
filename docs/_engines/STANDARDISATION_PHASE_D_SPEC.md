# Standardisation — Phase D: estate rollout (Dentists → Medical → Solicitors → digital-agency)

**Status:** EXECUTING — opened 2026-06-11 on user go ("roll the machinery out to all of the other sites... put sonnet to work").

**The phase in one line:** the four remaining sites adopt the shared machinery generalist proved in Phases A-C — analytics SDK, tools platform, operator console, schema/reader apparatus — by composition against `packages/web-shared`, one site per branch, strictly sequential.

**Compliance gate RESOLVED (user, 2026-06-11):** the Phase A legitimate-interest item (opt-out tracking posture never legally vetted) was put to the user with options; user chose **"Same as generalist"** — the opt-out, consent-respecting, first-party posture rolls to all four sites. The un-vetted status is still true and remains on record; the rollout gate it imposed is waived estate-wide by that decision.

## Execution log
*(appended per site, same convention as Phases A/B/C)*

## Sequence & branches

```
adopt-dentists   → adopt-medical → adopt-solicitors → adopt-agency
```
One branch per site, merged + post-merge-CI-green before the next starts. Deploy per site is an operator gate AFTER its merge (env vars first — see deploy gate). digital-agency goes last: different site shape (agency lead-gen, fewest mechanism surfaces) — by then the template is rote.

## Frozen per-site decisions (manager, 2026-06-11)

| Site | site_key (live registry ✓) | analytics storage prefix (FROZEN at adoption, GAP-1 rule) |
|---|---|---|
| Dentists | `dentists` | `dfp` |
| Medical | `medical` | `ma` |
| Solicitors | `solicitors` | `afl` |
| digital-agency | `agency` | `aff` |

No site has pre-existing first-party storage keys, so all start fresh (no legacyPrefix needed). All four keys verified in the live `sites` registry and the `leads.source` CHECK (Phase A rollout precondition — met).

**GA4:** Dentists/Medical/Solicitors carry live GA4 tags today. They are NOT removed in this phase — first-party lands alongside; the keep-or-drop-GA4 decision is a separate later call (generalist's no-GA4 was a generalist-specific decision). Do not touch GA tags.

## Per-site adoption checklist (the template — what generalist got)

Each site's brief = run this list, compose against the SHARED packages, delete the site's local copies where a shared equivalent exists (dedup proof), never fork.

1. **Site audit FIRST** (executor, committed as the first log entry): inventory the site's calculators (count, routes, where the maths lives), any newsletter/subscribe surface, GA tag location, LeadForm shape, schema/TOC/reading-progress local copies, anything that diverges from the generalist template. The audit decides scope; no improvising mid-adoption.
2. **Analytics SDK composition** (GAP-1 pattern): providers in layout, `/api/track` wrapper route reading site key from config (PF-07 — no literals), `form_*` events + honeypot + visitor stitching on LeadForm, web-vitals, data-cta attributes. Prefix per the frozen table. Opt-out posture identical to generalist.
3. **Tools platform adoption** (GAP-2 Stage-2 pattern): each existing calculator → pure compute lib (TL-03) + golden tests pinned to the OLD component's outputs FIRST (the STOP rule: a differing figure is reconciled explicitly; a wrong OLD figure is a user finding, never silently fixed) → GenericTool config → shared renderer via a site-local `"use client"` wrapper (the RSC lesson — `next build` is the gate, not tsc) → registry; gallery/sitemap derive from `allTools()` (SEO-01); `/embed/[slug]` + gallery + `embedPrefix` CSP; per-site `docs/<site>/TOOLS.md` quality-bar doc (TL-04).
4. **Operator console** (GAP-3 pattern): mount `/admin/analytics` with the shared cookie auth; `ADMIN_DASHBOARD_KEY` in env contract; not-operated panels render their explicit state (these sites run no experiments/nurture/lead-intent).
5. **Schema library + reader apparatus re-point** (the GAP-8 row deferred to "their own uplift windows" — this is that window): re-point to `web-shared/schema` + `web-shared/content`, delete local copies. **JSON-LD byte-regression check against the live site** (the GAP-8 live-vs-local trick — live still serves the pre-adoption build, use it as baseline). **Medical caution:** FLAT blog routing — shared nested-slug link tooling false-positives there; use `scripts/medical_flat_link_audit.py` for any link verification, never slug_resolver --fix.
6. **Nurture:** audit-dependent. If the site operates NO newsletter surface (expected for all four), nothing to adopt — record n/a; do NOT build a newsletter (inventory expansion, not mechanism). If one exists, GAP-5 re-point pattern.
7. **Acceptance per site:** full test suite green (229 + site's golden tests) · 6-site tsc clean · the SITE's `next build` green · AN-grep + PF-07 grep · TL-01/02/03 verify lines · OB-01/02 verify lines (runtime, local server) · execution log in same commits.

**STOP conditions (all carried):** golden-figure mismatch resolved silently · Property/** writes · schema-output changes (SEO-sensitive) · subscriber/webhook code outside the GAP-5 engine · anything non-additive on shared tables · real emails/leads through prod pipelines.

## Deploy gate (per site, after its merge — operator + manager)

1. Vercel env for the site: `SUPABASE_SERVICE_ROLE_KEY` + `NEXT_PUBLIC_SUPABASE_URL`/anon key (PF-05 set) + `ADMIN_DASHBOARD_KEY` (fresh random per site).
2. `vercel deploy --prod` from repo root with the site's project-ID env override (NEVER from inside the site dir — the learned workflow).
3. Post-deploy: `node scripts/an01_browser_pass.mjs <url> <prefix>` (the reusable AN-01 gate) · console login check · ingest check (site's rows landing in web_sessions).

## Manager-verified live-DB facts for executors
- `web_sessions` → `started_at`/`last_seen_at` (NO created_at) · `web_events` → `ts` · `leads` status CHECK: new/contacted/qualified/converted/archived.
- All four site keys exist in `sites` registry + leads CHECK. Track-route FK will reject any unregistered key (the Phase A hard gate — protective, not a bug).
- The vw_* views are site_key-parameterised (Phase B audit) — consoles work per-site with zero view changes.
