# New-site spinup runbook (Site #8 and beyond)

**Audience:** a future Claude session launching a brand-new site onto the estate, with zero memory of previous sessions. Read this in full before writing a single file.

**Proven by:** contractors-ir35 launch (site #7), 2026-06-12.

**Single entry point for context:** `docs/_engines/STANDARDISATION_PROGRAM.md` (estate overview + current machinery inventory). Read it first.

---

## Before you start — STOP conditions (carry throughout)

These conditions require a hard pause and manager decision before proceeding:

- Any schema JSON-LD output change on an existing page (estate-wide posture: local builders stay until explicit sign-off).
- Any `Property/**` write outside a named scope (Property is the revenue site and central lead pipeline host).
- Any change to `packages/web-shared/` that is not strictly additive.
- Any subscriber/webhook code that does not use the shared nurture engine from `web-shared/nurture/`.
- Any consent field (`consent_given`, `consent_text`, `consent_at`) that is not sourced from a rendered, user-operated checkbox. Never hardcode `consent: true`. Never infer from form submission alone.
- Any golden-figure mismatch after extracting a compute lib. Reconcile explicitly; never silently fix a stale figure — it is a user finding.
- Any real lead or email through a prod pipeline during development.
- Any SQL change that is not strictly additive (no DROP TABLE, no column removal, no constraint tightening on existing data).

---

## Model-tiering convention

| Role | Model | Used for |
|---|---|---|
| Haiku | `claude-haiku-*` | Mechanical tasks: file copies, search/replace, grep checks, format conversions |
| Sonnet | `claude-sonnet-*` | Composition work: wiring providers, adapting existing patterns, writing tests, config files |
| Opus | `claude-opus-*` | Writing + judgment: niche.config content, blog copy, house_positions, briefs, quality gates |

Never use DeepSeek anywhere. All engine reasoning and human-quality writing goes through Opus sub-agents.

---

## Frozen storage-prefix registry

Every site that adopts the analytics SDK gets one frozen storage prefix, set once at adoption and never changed (changing it orphans existing visitor identities in the browser).

| Site | site_key | storagePrefix |
|---|---|---|
| Property | `property` | `ptp` |
| Dentists | `dentists` | `dfp` |
| Medical | `medical` | `ma` |
| Solicitors | `solicitors` | `afl` |
| digital-agency | `agency` | `aff` |
| generalist | `generalist` | `hd` |
| contractors-ir35 | `contractors-ir35` | `cfp` |
| construction-cis | `construction-cis` | `bfp` |
| charities | `charities` | `cnp` |

**For site #8:** pick the next free two-to-three letter prefix (initials of the brand, or a clear niche abbreviation), confirm it is not already in use by grepping all `*/web/src/app/layout.tsx` files, and add it to this table in this doc before writing any code. The prefix is frozen from that moment.

---

## Step 0 — Niche decisions and config

**WHAT:** Lock the niche config, blog generator config, and seed script before writing any code. These drive everything downstream.

**OWNER:** Operator (niche/product decisions) + Opus sub-agent (copy/voice).

**FILES + COMMANDS:**

1. **`<site>/niche.config.json`** — validated by `validateNicheConfig()` from `@accounting-network/web-shared/lib/niche-config`. Do NOT use a blind `as NicheConfig` cast. The two most common defects at scaffold stage:
   - `content_strategy.site_key` and `content_strategy.source_identifier` must match (the PF-07 rule). Unlike generalist (which has a split "generalist"/"general" alias), new sites should use identical values for both.
   - Placeholder phone numbers, empty GA ids, and missing brand assets are pre-launch gates, not post-launch fixes. Document them explicitly.

2. **`optimisation_engine/blog_generator/site_configs/<site_key>.py`** — mirrors the existing configs in that directory. Contains: `SITE_KEY`, `BLOG_DIR`, `WEB_ROOT`, `DOMAIN`, system prompt, category→path mapping, internal links, prohibited topics.

3. **Seed script** — run dry-run first (`--dry-run`), then live only after the live DB has the registry row (Step 1 must complete first):
   ```
   python -m optimisation_engine.blog_generator.seed --site <site_key> --dry-run
   python -m optimisation_engine.blog_generator.seed --site <site_key>
   ```

**VERIFY:** `python scripts/spinup_site_check.py <site_key>` check 1 passes (niche.config.json parses + site_key matches).

---

## Step 1 — Live-DB registration (FIRST, before any other step)

**WHAT:** Register the site key in the live Supabase database. This must happen before blog_topics seeding (FK), before web_sessions ingest (FK), and before leads carry the source. The `/api/track` route's FK rejects unregistered keys by design — this is protective, not a bug.

**OWNER:** Manager (applies migrations via the Management API).

**WHY FIRST:** The track route has a foreign-key check on `sites.site_key`. A deploy without this step will cause every analytics event to fail with a FK violation. Lead notifications will also silently drop for unregistered source keys.

**FILES + COMMANDS:**

Two migrations are required, applied in order via the Management API (same pattern as `scripts/apply_web_analytics_migrations.py`):

Migration 1 — `supabase/migrations/<YYYYMMDD>000001_add_<site_key>_to_sites.sql`:
- Read the live `sites_site_key_check` constraint definition from `pg_constraint` BEFORE writing (do not assume the constraint name from old migration files — constraint names have been renamed live before):
  ```sql
  SELECT conname, pg_get_constraintdef(oid)
  FROM pg_constraint WHERE conname LIKE '%site_key%';
  ```
- `ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_site_key_check;`
- `ALTER TABLE sites ADD CONSTRAINT sites_site_key_check CHECK (site_key = ANY (ARRAY[...all existing keys..., '<new_key>'::text]));`
- `INSERT INTO sites (site_key, display_name, domain, gsc_property_url, bing_property_url, niche, target_buyer_persona, brand_voice_notes, content_dir, git_repo_path, blog_topics_table, active) VALUES (...) ON CONFLICT (site_key) DO NOTHING;`

Migration 2 — `supabase/migrations/<YYYYMMDD>000002_add_<site_key>_to_leads_source.sql`:
- Read the live `leads_source_valid` constraint definition from `pg_constraint` BEFORE writing:
  ```sql
  SELECT conname, pg_get_constraintdef(oid)
  FROM pg_constraint WHERE conname LIKE '%source%' AND conrelid = 'leads'::regclass;
  ```
- `ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;`
- `ALTER TABLE leads ADD CONSTRAINT leads_source_valid CHECK (source IN (...all existing values..., '<new_key>') OR source IS NULL);`

**WORKED EXAMPLE:** `supabase/migrations/20260613000001_add_contractors_ir35_to_sites.sql` and `20260613000002_add_contractors_ir35_to_leads_source.sql` — these are the contractors-ir35 migrations applied to prod 2026-06-12. The header comment shows the exact live constraint def that was read before writing the migration.

**VERIFY:** `python scripts/spinup_site_check.py <site_key>` check 2 passes (sites row + leads CHECK present).

**Also required before launch:** Add the site's source identifier to Property's central lead notify allowlist. The `leads_to_email_trg` trigger fires on all leads estate-wide, routing to `/api/leads/notify` on Property's deployment. If the new site's `source_identifier` is not in that route's allowed list, lead notifications silently drop. See `docs/_engines/CENTRAL_LEAD_PIPELINE.md` for the exact file to edit.

---

## Step 2 — Machinery composition checklist

**WHAT:** Bring the new site onto the shared machinery (`packages/web-shared/`). Mirror the Phase D adoption pattern (worked examples: Dentists PR #10, Solicitors PR #12).

**OWNER:** Sonnet executor (composition is mechanical once the pattern is understood).

**ORDERED CHECKLIST:**

### 2a. Security headers (MUST — do this first)

Add `buildSecurityHeaders()` to `next.config.ts`. Copy the pattern from `Dentists/web/next.config.ts`:
```ts
import { buildSecurityHeaders } from "@accounting-network/web-shared/lib/security-headers";
// In the NextConfig:
headers: buildSecurityHeaders({ ga: false, supabase: true, embedPrefix: "embed" })
// Set ga: true only if the site has a Google Analytics id. Set embedPrefix only if embed routes exist.
```

### 2b. Analytics SDK providers

In `src/app/layout.tsx`, add:
```tsx
import { ConsentProvider } from "@accounting-network/web-shared/analytics";
import { AnalyticsProvider } from "@accounting-network/web-shared/analytics";
// Wrap the body:
<ConsentProvider>
  <AnalyticsProvider
    siteKey={niche.content_strategy.site_key}
    storagePrefix="<FROZEN_PREFIX>"   // e.g. "cfp" for contractors-ir35 — never from config
    posture="opt-out"
    noTrackPrefixes={["/admin", "/embed"]}
  >
    {children}
  </AnalyticsProvider>
</ConsentProvider>
```

The `storagePrefix` value is a FROZEN LITERAL. It must NOT be read from config or env — it must be hardcoded in layout.tsx and never changed after first deploy.

### 2c. `/api/track` route

Create `src/app/api/track/route.ts`:
```ts
import { createTrackHandler } from "@accounting-network/web-shared/analytics";
import { niche } from "@/config/niche-loader";
export const { GET, POST } = createTrackHandler(niche.content_strategy.site_key);
```

The site key MUST come from niche config (PF-07 rule — no hardcoded string literal).

### 2d. Admin console routes

Create `src/app/admin/analytics/` and `src/app/api/admin/login/route.ts`. Copy from `Dentists/web/src/app/admin/analytics/` and `Dentists/web/src/app/api/admin/`. Replace site-key literals with `niche.content_strategy.site_key` (PF-07). Add `ADMIN_DASHBOARD_KEY` to the env contract.

### 2e. LeadForm wiring (LD-02/03/04/05)

The shared composition pattern (borrow from `Dentists/web/src/components/forms/LeadForm.tsx`):
- `useFormTracking("lead_form")` — field focus/blur/error/submit events
- Hidden `company_url` honeypot field (LD-03, SEC-08)
- `getVisitorId()` / `getSessionId()` stitching (LD-05) — only after analytics SDK is live
- `submitLead()` from `@accounting-network/web-shared/lib/supabase-client`
- Consent fields (`consent_given`, `consent_text`, `consent_at`) ONLY from a rendered, user-operated checkbox. The stored `consent_text` must byte-match the visible label (LD-04 hard rule).

If the site has a health-check wizard: apply the same wiring. The consent checkbox must be on the final data-collection step, required to advance (`canProceed()` gate), with `consent_given` from checkbox state and `CONSENT_TEXT` constant equal to the rendered label.

### 2f. Blog apparatus (Phase 3 — content program)

These items are deferred until the content program starts. Source paths to borrow from Dentists when the time comes:

| Item | Dentists source |
|---|---|
| `lib/blog.ts` | `Dentists/web/src/lib/blog.ts` — import shared frontmatter validator; do NOT copy Property/Dentists parser verbatim (silent-default risk) |
| `content/blog/` directory | Create empty; populated by blog generator |
| `app/blog/[category]/[slug]/page.tsx` | `Dentists/web/src/app/blog/` |
| `app/api/og/route.tsx` | `Dentists/web/src/app/api/og/route.tsx` |
| `app/feed.xml/route.ts` | `Dentists/web/src/app/feed.xml/route.ts` |
| `app/llms-full.txt/route.ts` | `Dentists/web/src/app/llms-full.txt/route.ts` |

**FLAT routing note (Medical only):** Medical uses flat `/blog/{slug}` routes, not nested `/blog/{category}/{slug}`. Shared nested-slug tooling false-positives there; use `scripts/medical_flat_link_audit.py` for any link verification, never `slug_resolver --fix`.

### 2g. OG image route

`src/app/api/og/route.tsx` — borrow from `Dentists/web/src/app/api/og/route.tsx`. Real brand assets must exist in `public/brand/` before this is wired (logo 404 in OG images is a launch gate).

### 2h. vitest + test script (MUST before CI entry)

This is the Phase D lesson: a test that is not wired into the harness does not exist.

1. Create `<Site>/web/vitest.config.ts` — copy from `Dentists/web/vitest.config.ts` (includes the PostCSS clash workaround: `css: { postcss: { plugins: [] } }`).
2. Add `"test": "vitest run"` to `scripts` in `<Site>/web/package.json`.
3. Run `npm test` from `<Site>/web` to confirm the harness works before writing any test files.

Acceptance must run tests via the site's own `npm test` runner — never ad-hoc. CI's `--if-present` only fires if the script exists.

---

## Step 3 — Engine config registration

**WHAT:** Register the new site in the optimisation engine maps so GSC/Bing data flows and IndexNow submission works.

**OWNER:** Manager (one-time config additions, each tested when the engine is first run).

**EXACT FILE PATHS:**

| Surface | File | Action |
|---|---|---|
| GSC site URL | `optimisation_engine/clients/gsc_page_client.py` → `_SITE_URL_MAP` | Add `"<site_key>": "sc-domain:<domain>"` |
| Bing site URL | `optimisation_engine/clients/bing_query_client.py` → `DEFAULT_SITE_URL` | Add `"<site_key>": "https://www.<domain>"` |
| IndexNow key | `optimisation_engine/indexing/config.py` → `SITE_INDEXNOW_CONFIG` | Add entry; generate key: `python -c "import secrets;print(secrets.token_hex(16))"` |
| IndexNow key file | `<Site>/web/public/<key>.txt` | Create file containing the key string |
| Competitor rules | `optimisation_engine/competitor/brief_for_opus.py` → `SITE_RULES` | Add entry (content_dir, web_root, domain, audience, lead_form_segments, pillar_pages, authority_links) |
| Core pages | `optimisation_engine/corepage/config.py` → `CORE_PAGES` | Add entry (head_terms, geo_modifiers, page_url, source_tsx, web_root, head_match_like) |

**DEFERRED UNTIL ENGINES FIRST RUN (per `ENGINE_MAP_AND_ONBOARDING.md`):**
- `SITE_RULES` and `CORE_PAGES` entries: add at the time the engine is first run for the site, so the change is tested live.
- `corepage/term_analysis.py` `ROOT_TOKENS` — parameterise per site when first run.
- `corepage/guide_audit.py` `BLOG` and `CLUSTERS` — derive from site when first run.

**GA4 config** (`optimisation_engine/clients/ga4_config.py` → `GA4_PROPERTY_IDS`): deferred until the operator creates the GA4 property and supplies the measurement id. This is INFO-level — expected to be a gap at launch.

**VERIFY:** `python scripts/spinup_site_check.py <site_key>` check 10 reports GSC + Bing + IndexNow config present.

---

## Step 4 — Topic seeding

**WHAT:** Seed the `blog_topics` table with the new site's topic pool.

**OWNER:** Sonnet (mechanical) after Step 1 (DB registry) is complete.

**COMMANDS:**
```bash
# Dry-run first — verifies the config without writing to DB
python -m optimisation_engine.blog_generator.seed --site <site_key> --dry-run

# Live — only after sites registry row exists (Step 1 complete)
python -m optimisation_engine.blog_generator.seed --site <site_key>
```

**VERIFY:** `python scripts/spinup_site_check.py <site_key>` check 2 shows blog_topics count > 0 (INFO line).

---

## Step 5 — CI matrix entry

**WHAT:** Add the new site to the GitHub Actions build matrix so every push/PR exercises the site's build.

**OWNER:** Sonnet (one edit).

**FILE:** `.github/workflows/ci-build-test.yml`

Add to the `matrix.include` list (mirror the pattern for all existing sites exactly — do not change install/build steps):
```yaml
- site: <site-dir-name>    # the directory name under the monorepo root
  url: https://www.<domain>
```

The `site` value is the directory name (e.g. `contractors-ir35`), not the site_key. Remove any exclusion comment naming this site if present.

**VERIFY:** `python scripts/spinup_site_check.py <site_key>` check 8 passes (CI matrix includes the site key).

---

## Step 6 — Vercel project creation

**WHAT:** Link the site to a Vercel project with the correct settings. Several gotchas here from the estate's history.

**OWNER:** Manager (Vercel account access required).

**RECIPE:**

1. **Create the project from the repo root** via the Vercel CLI or dashboard. Set:
   - `rootDirectory`: `<Site>/web` (e.g. `contractors-ir35/web`)
   - `framework`: `nextjs` — THIS IS CRITICAL. If the framework preset is `null`, all routes return 404 even though the build succeeds. Always verify with: `vercel project inspect | grep framework`
   - GitHub auto-deploy: OFF. All deploys are triggered manually from the repo root with the `VERCEL_PROJECT_ID`/`VERCEL_ORG_ID` override (learned in Phase E/F). Never deploy from inside the site directory.

2. **Env vars to set on the Vercel project:**

   | Var | Notes |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Shared Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (public — safe in bundle) |
   | `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only, sensitive) — re-fetch from Supabase Management API `/api-keys` if needed; Vercel sensitive values are unreadable after setting |
   | `ADMIN_DASHBOARD_KEY` | Fresh random secret per site: `openssl rand -hex 32` |
   | `NEXT_PUBLIC_SITE_URL` | `https://www.<domain>` |

   Paste env var values carefully — an embedded newline in a `NEXT_PUBLIC_*` var corrupts the JWT in the bundle and causes `fetch "Invalid value"` errors that are hard to diagnose. Paste as plain text, not from a multi-line shell command.

3. **Deploy command (from repo root):**
   ```bash
   VERCEL_ORG_ID=<org_id> VERCEL_PROJECT_ID=<project_id> vercel deploy --prod
   ```
   Project and org IDs live in `<Site>/web/.vercel/project.json` once linked.

**VERIFY:** `python scripts/spinup_site_check.py <site_key>` check 9 passes (`.vercel/project.json` exists).

---

## Step 7 — Live battery

**WHAT:** Verify the deployed site is working end-to-end. Every item must pass before calling the site live.

**OWNER:** Manager (requires browser + network access).

**CHECKS:**

1. **AN-01 browser pass** — the canonical analytics acceptance test:
   ```bash
   node scripts/an01_browser_pass.mjs https://www.<domain> <storagePrefix>
   ```
   Verifies: beacons fire, visitor/session IDs created under `<prefix>_vid`/`<prefix>_sid`, opt-out stops beacons, ids persist across page loads.

2. **Console auth runtime check** — load `/admin/analytics` without credentials, expect a 307 redirect to `/admin/analytics/login`. Then authenticate and confirm the dashboard loads with live data.

3. **Ingest verification SQL** — confirm sessions and events are landing for the new site:
   ```sql
   SELECT site_key, count(*) FROM web_sessions WHERE site_key = '<site_key>' GROUP BY site_key;
   SELECT site_key, count(*) FROM web_events   WHERE site_key = '<site_key>' GROUP BY site_key;
   ```
   Run via the Supabase dashboard or the Management API.

4. **Headers probe** — confirm security headers are present:
   ```bash
   curl -I https://www.<domain>/ | grep -E "x-frame|x-content|strict-transport|content-security"
   ```

5. **Feed + llms 200s** — once blog apparatus is live:
   ```bash
   curl -o /dev/null -s -w "%{http_code}" https://www.<domain>/feed.xml
   curl -o /dev/null -s -w "%{http_code}" https://www.<domain>/llms-full.txt
   ```

6. **Test-lead cleanup** — if a test lead was submitted during verification, delete it from the `leads` table to keep the store real-traffic-only:
   ```sql
   DELETE FROM leads WHERE source = '<site_key>' AND email LIKE '%test%';
   ```
   Never route real leads through the prod pipeline during development.

7. **Lead pipeline probe** — confirm Property's central lead pipeline is alive (expect 401, never 404):
   ```bash
   curl -s -o /dev/null -w "%{http_code}" https://www.propertytaxpartners.co.uk/api/leads/notify
   # Expected: 401 (route alive, auth required)
   ```
   See `docs/_engines/CENTRAL_LEAD_PIPELINE.md` for full pipeline documentation. A 404 here means the Property deploy is broken and ALL sites' lead notifications are down.

8. **Estate console verification** — the new site appears automatically in the estate console at https://estate-console.vercel.app once its `sites` registry row is active. No console code changes are needed (registry-driven per Phase E design).

**Delete the AN-01 test session** from the store after verifying (as done for all Phase D site launches).

---

## Step 8 — Operator checklist

These items require operator action outside the codebase. They gate the site going fully live.

- [ ] **Domain purchase** — purchase `www.<domain>` if not already owned.
- [ ] **DNS** — point the domain to Vercel (A / CNAME records per Vercel's domain setup UI). Vercel will provision TLS automatically.
- [ ] **GA4 property** — create a GA4 property in Google Analytics, copy the measurement ID (`G-XXXXXXXXXX`), set `seo.google_analytics_id` in `niche.config.json`, redeploy.
- [ ] **GA4 config** — add the property ID to `optimisation_engine/clients/ga4_config.py` → `GA4_PROPERTY_IDS`.
- [ ] **GSC property + verification** — add the domain in Google Search Console, add the verification code to `niche.config.json` → `seo.search_console_verification.google`, redeploy.
- [ ] **Bing WMT import** — import the site from GSC in Bing Webmaster Tools; add Bing verification code to niche.config.json.
- [ ] **Real phone number** — replace any placeholder phone in `niche.config.json → contact.phone` with the real number.
- [ ] **Brand assets** — ensure `public/brand/primary-logo.png` and `public/brand/icon-alt.png` exist (OG image route depends on them).

---

## Step 9 — Docs and memory hygiene

**WHAT:** Record the new site's state so future sessions have a starting point.

**OWNER:** Manager (or Sonnet writing docs at manager direction).

**CREATE:**

1. **`docs/<site>/STATE.md`** — current live state, open items, launch date, Vercel project ID, storage prefix confirmed.
2. **`docs/<site>/house_positions.md`** — fact base and editorial positions for content programs (created when the first content program starts, not at launch).

**UPDATE:**

3. **`docs/_engines/STANDARDISATION_PROGRAM.md`** — add the new site to the "What exists now" table and the capability/machinery inventory.
4. **`docs/_engines/SITE_SPINUP.md`** (this file) — update the frozen prefix registry table with the new site's entry.
5. **Memory** — update `MEMORY.md` with a per-site state entry pointing to `docs/<site>/STATE.md`.

---

## Final verification — `scripts/spinup_site_check.py`

Run this before calling any step complete:

```bash
python scripts/spinup_site_check.py <site_key>
# With explicit site dir (required for Dentists):
python scripts/spinup_site_check.py dentists --site-dir Dentists
```

Exit 0 = no GAPs (SKIPs and INFOs are acceptable). Exit 1 = one or more GAPs remain.

The script checks all 11 readiness dimensions (niche config, live DB, analytics providers, API routes, security headers, blog apparatus, test harness, CI matrix, Vercel link, engine maps, GA4) and prints a summary table. A GAP on checks 1-8 is a launch blocker. A GAP on checks 9-11 is expected pre-launch and acceptable during composition.

---

## Parked/deferred items (do not build unless operator explicitly requests)

- **Newsletter/nurture activation**: compose the shared engine (`web-shared/nurture/`) but leave CRON_SECRET unset (dormant posture). Activation is an operator decision when subscriber numbers justify it.
- **Schema re-point**: shared builders emit different JSON-LD from per-site local builders. Do NOT re-point until there is an explicit sign-off window (SEO-sensitive; estate-wide STOP posture).
- **Tools platform**: defer until the content program is mature enough that calculators provide conversion value.
- **Experiments**: compose the empty registry (2 lines in layout) but do not run experiments until there is enough traffic to reach significance. Read `docs/_engines/EXPERIMENTS.md` before touching.
- **Per-site console retirement**: the unified console at https://estate-console.vercel.app covers every registered site. Per-site `/admin/analytics` consoles can be retired at operator's discretion.
