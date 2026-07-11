"""Spin up a new niche site in the monorepo with one command.

Creates the directory scaffold + writes Phase 4 / Phase 2 / Phase 3 wiring
(workspaces, IndexNow key + config, sites table, blog_generator
site_config). The new site is ready to receive content via
`python -m optimisation_engine.blog_generator --site <niche>` after the
manual Vercel + DNS gates.

Usage:
  python -m optimisation_engine.ops.spinup_site \\
    --niche construction-cis \\
    --display-name "Construction Finance Partners" \\
    --domain www.construction-finance-partners.co.uk \\
    --brand-primary "#1d4ed8" \\
    --brand-on-primary "#ffffff" \\
    --niche-summary "UK accountants for construction contractors and CIS subcontractors"

What gets scaffolded:
  <niche>/                              <- monorepo subdirectory
    niche.config.json                   <- brand metadata
    pipeline/                           <- empty (no per-site scripts needed)
    web/
      package.json                      <- workspace member
      next.config.ts                    <- outputFileTracingRoot at repo root + transpilePackages
      tsconfig.json
      postcss.config.mjs
      vercel.json                       <- workspace install command
      src/
        app/
          layout.tsx                    <- minimal layout
          page.tsx                      <- placeholder home with LeadForm
          globals.css                   <- canonical brand tokens
      public/
        <indexnow_key>.txt              <- IndexNow ownership proof

Edits to existing files:
  package.json                          <- adds <niche>/web to workspaces
  optimisation_engine/indexing/config.py <- adds <niche> -> {host, key}
  optimisation_engine/blog_generator/site_configs/<niche>.py <- new file
  optimisation_engine/blog_generator/routing_safety.py <- adds <niche> to EXPECTED_SITE_PREFIXES
  Supabase `sites` table <- new row

Manual gates (printed at end):
  1. Buy the domain + configure DNS to Vercel
  2. Create Vercel project, set rootDirectory = "<niche>/web"
  3. Add NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY env vars to Vercel
  4. Verify Google Search Console property on the new domain
  5. Create Google Analytics 4 property + get measurement ID
  6. `npm install` at workspace root (picks up new workspace package)
  7. `python -m optimisation_engine.ingestion.broaden_keyword_pool --site <niche>` (or
     similar) to populate blog_topics with site_key=<niche>
  8. `python -m optimisation_engine.blog_generator --site <niche>` (loop) to seed content
"""
from __future__ import annotations

import argparse
import json
import os
import secrets
import sys
from pathlib import Path
from textwrap import dedent

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from shared_supabase_config import SUPABASE_KEY, SUPABASE_URL  # noqa: E402

import requests  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slug_safe(s: str) -> bool:
    """Niche slug: lowercase, hyphens, alphanumeric. Used for directory + workspaces."""
    import re
    return bool(re.match(r"^[a-z][a-z0-9-]*[a-z0-9]$", s))


def generate_indexnow_key() -> str:
    """32-char lowercase hex string."""
    return secrets.token_hex(16)


def fail(msg: str) -> None:
    print(f"[FAIL] {msg}", file=sys.stderr)
    sys.exit(1)


def write_file(path: Path, content: str, *, executable: bool = False) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    if executable:
        os.chmod(path, 0o755)


# ---------------------------------------------------------------------------
# Template strings (filled via .format)
# ---------------------------------------------------------------------------

NICHE_CONFIG_JSON = """{{
  "niche_id": "{niche}",
  "display_name": "{display_name}",
  "legal_name": "{display_name} Ltd",
  "domain": "{domain}",
  "tagline": "{tagline}",
  "description": "{description}",
  "brand": {{
    "primary_color": "{brand_primary}",
    "logo_path": "/brand/logo.png",
    "publisher_logo_url": "/api/og"
  }},
  "contact": {{
    "email": "hello@{root_domain}",
    "phone": "+44 20 0000 0000"
  }},
  "navigation": [
    {{"label": "Services", "href": "/services"}},
    {{"label": "About", "href": "/about"}},
    {{"label": "Contact", "href": "/contact"}}
  ]
}}
"""

PACKAGE_JSON = """{{
  "name": "{niche}-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {{
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }},
  "dependencies": {{
    "@accounting-network/web-shared": "*",
    "gray-matter": "^4.0.3",
    "next": "^15.5.14",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }},
  "devDependencies": {{
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.5.14",
    "tailwindcss": "^4",
    "typescript": "^5"
  }}
}}
"""

NEXT_CONFIG_TS = """import type {{ NextConfig }} from "next";
import path from "node:path";
import {{ fileURLToPath }} from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Repo root is two levels up: {niche}/web -> {niche} -> Accounting (repo root).
const repoRoot = path.resolve(appDir, "..", "..");

const nextConfig: NextConfig = {{
  outputFileTracingRoot: repoRoot,
  transpilePackages: ["@accounting-network/web-shared"],
  images: {{
    remotePatterns: [
      {{ protocol: "https", hostname: "images.unsplash.com" }},
      {{ protocol: "https", hostname: "images.pexels.com" }},
    ],
  }},
  async redirects() {{
    // Estate audit 2026-07: 4 live sites emit 307 on apex->www. Permanent 308
    // in code as a fallback; ALSO set the Vercel dashboard domain redirect to
    // 308 (permanent) when attaching the apex domain.
    return [
      {{
        source: "/:path*",
        has: [{{ type: "host", value: "{root_domain}" }}],
        destination: "https://{domain}/:path*",
        permanent: true,
      }},
    ];
  }},
}};

export default nextConfig;
"""

TSCONFIG_JSON = """{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "../niche.config.json"],
  "exclude": ["node_modules"]
}
"""

POSTCSS_CONFIG = """const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;
"""

VERCEL_JSON = """{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "cd ../.. && npm install --no-audit --no-fund",
  "buildCommand": "npm run build",
  "framework": "nextjs"
}
"""

GLOBALS_CSS = """/* Tailwind source("..") scans from src/ relative to this file. */
@import "tailwindcss" source("..");

:root {{
  --background: #ffffff;
  --surface: #f8fafc;
  --surface-elevated: #ffffff;
  --ink: #0f172a;
  --ink-soft: #334155;
  --muted: #475569;
  --border: #e2e8f0;

  /* Canonical brand tokens for @accounting-network/web-shared components. */
  --brand-primary: {brand_primary};
  --brand-primary-strong: {brand_primary};
  --brand-on-primary: {brand_on_primary};
}}

body {{
  background: var(--background);
  color: var(--ink);
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
}}
"""

LAYOUT_TSX = """import type {{ Metadata }} from "next";
import "./globals.css";

const siteUrl = "https://{domain}";

// Estate audit 2026-07 fixes baked in at scaffold time:
// - description trimmed to <=155 chars by spinup (meta-length defect)
// - og:image is the dynamic 1200x630 PNG route /api/og (never an SVG)
// - Organization JSON-LD present from day one (lawyers/agency schema defect)
const organizationJsonLd = {{
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "AccountingService"],
  "@id": `${{siteUrl}}#organization`,
  name: "{display_name}",
  url: siteUrl,
  description: "{description}",
  logo: `${{siteUrl}}/api/og`,
  areaServed: "GB",
}};

export const metadata: Metadata = {{
  metadataBase: new URL(siteUrl),
  title: "{display_name}",
  description: "{description}",
  alternates: {{ canonical: siteUrl }},
  openGraph: {{
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "{display_name}",
    title: "{display_name}",
    description: "{description}",
    images: [{{ url: "/api/og", width: 1200, height: 630, alt: "{display_name}" }}],
  }},
  twitter: {{
    card: "summary_large_image",
    title: "{display_name}",
    description: "{description}",
    images: ["/api/og"],
  }},
}};

export default function RootLayout({{
  children,
}}: {{
  children: React.ReactNode;
}}) {{
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{{{ __html: JSON.stringify(organizationJsonLd) }}}}
        />
      </head>
      <body>{{children}}</body>
    </html>
  );
}}
"""

# src/app/icon.svg is auto-wired by Next as the favicon (audit defect: one
# live site shipped with no favicon link at all). Replaced by real brand
# assets at the design pass.
ICON_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="{brand_primary}"/>
  <text x="32" y="42" font-family="ui-sans-serif, system-ui, sans-serif" font-size="32" font-weight="700" fill="{brand_on_primary}" text-anchor="middle">{initial}</text>
</svg>
"""

# Dynamic 1200x630 PNG og:image (audit defect: live sites shipped a
# non-rendering SVG placeholder). Pattern lifted from construction-cis
# /api/og; brand values are baked in at scaffold time, swap to the
# niche-loader once the site grows one.
OG_ROUTE_TSX = """import {{ ImageResponse }} from "next/og";
import type {{ NextRequest }} from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {{
  const title = req.nextUrl.searchParams.get("title") ?? "{display_name}";
  return new ImageResponse(
    (
      <div
        style={{{{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "white",
          padding: "60px",
        }}}}
      >
        <div style={{{{ display: "flex", fontSize: 56, fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}}}>
          {{title}}
        </div>
        <div style={{{{ display: "flex", alignItems: "center", gap: "16px" }}}}>
          <div style={{{{ width: 24, height: 24, borderRadius: 6, background: "{brand_primary}", display: "flex" }}}} />
          <span style={{{{ fontSize: 28, fontWeight: 600, color: "#334155" }}}}>{display_name}</span>
          <span style={{{{ fontSize: 24, color: "#64748b", marginLeft: "auto" }}}}>{root_domain}</span>
        </div>
      </div>
    ),
    {{ width: 1200, height: 630 }}
  );
}}
"""

PAGE_TSX = """export default function Home() {{
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-[var(--ink)]">
      <h1 className="text-4xl font-semibold tracking-tight">{display_name}</h1>
      <p className="mt-4 text-lg text-[var(--ink-soft)]">{tagline}</p>
      <p className="mt-8 text-sm text-[var(--muted)]">
        Site spinning up. Content will populate via the blog generator pipeline.
      </p>
    </main>
  );
}}
"""

SITE_CONFIG_PY = '''"""{display_name} ({niche}) site configuration.

Generated by optimisation_engine.ops.spinup_site on {date}. Edit freely
after the scaffold is in place.
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]


SITE_CONFIG: dict = {{
    "site_key": "{niche}",
    "display_name": "{display_name}",
    "domain": "{domain}",
    "site_base_url": "https://{domain}",
    "author_name": "{display_name} Editorial Team",
    "output_dir": "{niche}/web/content/blog",
    "pillar_output_dir": None,

    # Post Phase 4: all sites share blog_topics; site_key isolates rows.
    "topic_table": "blog_topics",
    "topic_column": "topic",
    "secondary_keywords_shape": "array",
    "done_marker_field": "used",
    "done_marker_value": True,
    "done_timestamp_field": "used_at",
    "slug_field": "slug",
    "topic_order": "publish_priority.desc.nullslast,keyword_difficulty.asc.nullslast,created_at.asc",

    "llm_provider": "anthropic",
    "llm_model": "claude-sonnet-4-6",
    "max_tokens": 6500,
    "temperature": 0.3,
    "verify_with_haiku": True,

    "post_categories": [],
    "internal_link_slugs": [],
    "anchor_terms": [],
    "hallucination_zones": [],
    "blog_system_prompt": """You are an expert UK accountant writing for {audience}.""".strip(),

    "seo_persona": {{
        "audience": "{audience}",
        "language_cues": [],
        "preferred_hooks": [],
        "banned_openers_extra": [],
        "brand_authority": "mid",
        "geo_qualifiers": ["UK"],
        "voice_signature": "specialist, evidence-driven, plain English",
    }},
}}
'''


# ---------------------------------------------------------------------------
# Phase-0 factory additions (expansion program, 2026-07): STATE.md, tranche
# Supabase migrations, CI matrix entry, sites/<site>.json wave stub,
# storagePrefix collision check.
# ---------------------------------------------------------------------------

# Known key lists as of 2026-07-11. The emitted migration header instructs the
# applier to re-read the LIVE constraint defs before applying (constraint
# contents have drifted from repo files before; construction-cis migration is
# still pending sign-off).
EXISTING_SITE_KEYS = [
    "property", "dentists", "medical", "solicitors", "agency", "generalist",
    "contractors-ir35", "construction-cis",
]
EXISTING_LEAD_SOURCES = [
    "dentists", "property", "medical", "solicitors", "generalist", "general",
    "agency", "agency-founder-finance", "contractors-ir35", "construction-cis",
]

STATE_MD = """# {niche} ({display_name}) site state

Last updated {date} (SCAFFOLDED, pre-launch). Generated by
`optimisation_engine.ops.spinup_site`. Tranche: **{tranche}**.

brand_locked: false

## Identity

- site_key `{niche}` | display **"{display_name}"** | intended domain `{domain}`
- Storage prefix **`{storage_prefix}` FROZEN** (added to the SITE_SPINUP.md registry at scaffold time; never change after first deploy)
- Tranche id: `{tranche}`
- Vercel project id: `PLACEHOLDER_VERCEL_PROJECT_ID` (filled by scripts/vercel_create_site.py)
- Brand: NOT LOCKED. No content generation until this flag reads `brand_locked: true` (owner gate G1).

## Launch state

- [ ] S1 brand lock (owner gate G1): flip `brand_locked: true` above, record brand spec
- [ ] S2 scaffold: spinup_site run (this file exists = done), spinup_site_check 1+8 pass, npm build green
- [ ] S3 research pack finalised + blog_topics seeded (owner gate G2)
- [ ] S4 machinery composition per SITE_SPINUP.md Step 2 (vitest, tsc, headers)
- [ ] S5 niche build: calculators (golden-figure vitest), data asset, house_positions.md, rates ledger
- [ ] S6 launch-core content generated + predeploy_gate green (brand lint precondition)
- [ ] S7 Vercel project + preview an01 pass + live battery (gates G3/G4)
- [ ] S8 domain-ready close-out: `sites.active=true`, tracker updated

## Data layer

- Tranche migration pair emitted at scaffold time (see supabase/migrations/); rows insert `active=false`
- Lead notify allowlist: add `{niche}` to Property /api/leads/notify allowlist in the per-tranche Property deploy (the sole sanctioned live-site touch)

## External steps (HUMAN ONLY, gate the site going live)

- [ ] Buy the domain `{root_domain}` and point DNS at Vercel (A/CNAME per Vercel domain UI)
- [ ] **Pre-attach refresh (same day the domain is bought):** run the rates-ledger lint + dated-reference sweep (tax-year mentions) over the corpus and patch stale figures BEFORE DNS attach
- [ ] Google Search Console: add property `sc-domain:{root_domain}`, verify (DNS TXT), submit `/sitemap.xml`, Request Indexing on key pages (discovery failure is the number 1 new-site risk)
- [ ] Bing Webmaster Tools: import the site from GSC, add Bing verification code to niche.config.json
- [ ] GA4: create property, copy measurement id into `{niche}/niche.config.json` -> seo.google_analytics_id, add to `optimisation_engine/clients/ga4_config.py`, redeploy
- [ ] Real phone number into `{niche}/niche.config.json` -> contact.phone (placeholder ships as +44 20 0000 0000)
- [ ] Brand assets: `public/brand/primary-logo.png` + `public/brand/icon-alt.png` (OG image route depends on them)
- [ ] Resend routing ONLY if a partner firm is signed (partner CC only on partnered sites; otherwise leads route to owner inbox)
"""


def load_frozen_prefixes() -> dict[str, str]:
    """All storagePrefix values in use: layout.tsx literals + the frozen
    registry table in docs/_engines/SITE_SPINUP.md."""
    import re
    found: dict[str, str] = {}
    for layout in ROOT.glob("*/web/src/app/layout.tsx"):
        for m in re.finditer(r'storagePrefix="([a-z0-9]+)"', layout.read_text(encoding="utf-8")):
            found[m.group(1)] = str(layout.relative_to(ROOT))
    spinup_doc = ROOT / "docs" / "_engines" / "SITE_SPINUP.md"
    if spinup_doc.exists():
        for m in re.finditer(r"\|\s*`[a-z0-9-]+`\s*\|\s*`([a-z0-9]+)`\s*\|", spinup_doc.read_text(encoding="utf-8")):
            found.setdefault(m.group(1), "docs/_engines/SITE_SPINUP.md frozen-prefix table")
    return found


def check_storage_prefix(prefix: str) -> None:
    import re
    if not re.match(r"^[a-z][a-z0-9]{1,3}$", prefix):
        fail(f"--storage-prefix must be 2-4 lowercase alphanumeric chars (got {prefix!r})")
    taken = load_frozen_prefixes()
    if prefix in taken:
        fail(f"storagePrefix {prefix!r} already in use ({taken[prefix]}). Pick another; prefixes are frozen forever.")


SITES_INSERT_SQL = """INSERT INTO sites (
  site_key, display_name, domain, gsc_property_url, bing_property_url,
  niche, target_buyer_persona, brand_voice_notes,
  content_dir, git_repo_path, blog_topics_table, active
) VALUES (
  '{site_key}',
  '{display_name}',
  '{domain}',
  'sc-domain:{root_domain}',
  NULL,
  '{audience}',
  '{audience}',
  'plain-English specialist authority; UK English; no em-dashes',
  '{site_key}/web/content/blog',
  '{site_key}/web',
  'blog_topics',
  false
)
ON CONFLICT (site_key) DO NOTHING;"""

SITES_MIGRATION_SQL = """-- Migration: {date_compact}000001_add_tranche_{tranche}_to_sites.sql
-- Tranche: {tranche} | new site keys: {new_keys_csv}
-- Generated by optimisation_engine.ops.spinup_site.
--
-- ROLLBACK / previous constraint definition (repo-known as of generation;
-- RE-READ THE LIVE DEF before applying, constraint names/contents have
-- drifted from repo files before):
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname LIKE '%site_key%';
--   sites_site_key_check: CHECK ((site_key = ANY (ARRAY[{prev_keys_csv}])))
--
-- Rows insert active=false (site stays out of the console until domain-ready).
-- Strictly additive. Run manually via Supabase SQL (Management API).

BEGIN;

ALTER TABLE sites DROP CONSTRAINT IF EXISTS sites_site_key_check;

ALTER TABLE sites ADD CONSTRAINT sites_site_key_check
  CHECK (
    site_key = ANY (ARRAY[
{array_lines}
    ])
  );

{inserts}

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'sites_site_key_check';
"""

LEADS_MIGRATION_SQL = """-- Migration: {date_compact}000002_add_tranche_{tranche}_to_leads_source.sql
-- Tranche: {tranche} | new source keys: {new_keys_csv}
-- Generated by optimisation_engine.ops.spinup_site.
--
-- ROLLBACK / previous constraint definition (repo-known as of generation;
-- RE-READ THE LIVE DEF before applying):
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname LIKE '%source%' AND conrelid = 'leads'::regclass;
--   leads_source_valid: CHECK ((source = ANY (ARRAY[{prev_sources_csv}])) OR source IS NULL)
--
-- Strictly additive. Run manually via Supabase SQL (Management API).

BEGIN;

ALTER TABLE leads DROP CONSTRAINT IF EXISTS leads_source_valid;

ALTER TABLE leads ADD CONSTRAINT leads_source_valid
  CHECK (
    source IN (
{source_lines}
    )
    OR source IS NULL
  );

COMMIT;

-- Verify after applying:
--   SELECT conname, pg_get_constraintdef(oid)
--   FROM pg_constraint WHERE conname = 'leads_source_valid';
"""


def build_sites_migration(site_rows: list[dict], date_compact: str, tranche: str) -> str:
    """One tranche migration extending sites_site_key_check + inserting rows (active=false)."""
    new_keys = [r["site_key"] for r in site_rows]
    all_keys = EXISTING_SITE_KEYS + [k for k in new_keys if k not in EXISTING_SITE_KEYS]
    return SITES_MIGRATION_SQL.format(
        date_compact=date_compact,
        tranche=tranche,
        new_keys_csv=", ".join(new_keys),
        prev_keys_csv=", ".join(f"'{k}'" for k in EXISTING_SITE_KEYS),
        array_lines=",\n".join(f"      '{k}'::text" for k in all_keys),
        inserts="\n\n".join(SITES_INSERT_SQL.format(**r) for r in site_rows),
    )


def build_leads_migration(new_keys: list[str], date_compact: str, tranche: str) -> str:
    all_sources = EXISTING_LEAD_SOURCES + [k for k in new_keys if k not in EXISTING_LEAD_SOURCES]
    return LEADS_MIGRATION_SQL.format(
        date_compact=date_compact,
        tranche=tranche,
        new_keys_csv=", ".join(new_keys),
        prev_sources_csv=", ".join(f"'{s}'" for s in EXISTING_LEAD_SOURCES),
        source_lines=",\n".join(f"      '{s}'" for s in all_sources),
    )


def insert_ci_matrix_entry(niche: str, domain: str) -> None:
    """Append the site to the CI matrix in ci-build-test.yml, preserving
    formatting. Handles both layouts: the P0-4 path-filtered `SITES='dir|url'`
    single-source block, and the older static `matrix.include:` list."""
    ci_path = ROOT / ".github" / "workflows" / "ci-build-test.yml"
    src = ci_path.read_text(encoding="utf-8")
    if f"{niche}|" in src or f"- site: {niche}\n" in src:
        print(f"[SKIP] {niche} already in CI matrix")
        return
    lines = src.splitlines(keepends=True)

    # New layout: SITES='...multiline dir|url list...' inside the changes job.
    sites_i = next((i for i, l in enumerate(lines) if l.strip() == "SITES='"), None)
    if sites_i is not None:
        end_i = sites_i + 1
        while end_i < len(lines) and lines[end_i].strip() != "'":
            end_i += 1
        if end_i >= len(lines):
            fail("SITES block in ci-build-test.yml has no closing quote")
        indent = lines[end_i - 1][:len(lines[end_i - 1]) - len(lines[end_i - 1].lstrip())]
        lines.insert(end_i, f"{indent}{niche}|https://{domain}\n")
        ci_path.write_text("".join(lines), encoding="utf-8")
        print(f"[OK] Added {niche} to CI SITES matrix block")
        return

    # Old layout: static include: list.
    include_i = next((i for i, l in enumerate(lines) if l.strip() == "include:"), None)
    if include_i is None:
        fail("Could not find SITES block or matrix include: list in ci-build-test.yml")
    end_i = include_i + 1
    while end_i < len(lines) and lines[end_i].strip():
        end_i += 1
    lines.insert(end_i, f"          - site: {niche}\n            url: https://{domain}\n")
    ci_path.write_text("".join(lines), encoding="utf-8")
    print(f"[OK] Added {niche} to CI build matrix")


def write_sites_wave_config(niche: str, display_name: str, domain: str) -> Path:
    """sites/<niche>.json wave-config stub. batchSize 1, single bucket 'a'
    (owner ruling 2026-07-08: no A/B/C lanes)."""
    cfg = {
        "site": niche,
        "displayName": display_name,
        "paths": {
            "repoRoot": str(ROOT).replace("\\", "/"),
            "worktreeBase": str(ROOT.parent).replace("\\", "/"),
            "worktreePattern": "Accounting-wt-{site}-{wavekind}{wave}-{bucket}",
            "branchPattern": "{site}-{wavekind}{wave}-{bucket}",
            "docsDir": f"docs/{niche}",
            "briefsDir": f"briefs/{niche}",
            "sessionsDir": f"docs/sessions/{niche}",
            "blogContentDir": f"{niche}/web/content/blog",
            "blogRoutesDir": f"{niche}/web/src/app/blog",
            "buildDir": f"{niche}/web",
            "housePositions": f"docs/{niche}/house_positions.md",
            "netnewProgram": "docs/_engines/NETNEW_PROGRAM.md",
            "siteConfigJson": f"{niche}/niche.config.json",
        },
        "vercel": {
            "projectJson": f"{niche}/web/.vercel/project.json",
            "productionDomain": domain,
        },
        "indexnow": {"module": "optimisation_engine.indexing.submit_indexnow"},
        "wave": {
            "_doc": "Owner ruling 2026-07-08: no A/B/C lanes; batchSize 1 = one sub-agent per topic, parallel. Single bucket retained for path/naming compatibility.",
            "buckets": ["a"],
            "bucketsUpper": ["A"],
            "megaWaveSize": 60,
            "batchSize": 1,
            "waveKind": "wave",
        },
        "naming": {
            "launchPromptsFile": "WAVE{wave}_LAUNCH_PROMPTS.md",
            "startHereFile": "WAVE{wave}_SESSION_{bucketUpper}_START_HERE.md",
            "trackerFile": "wave{wave}_page_tracker.md",
            "flagsFile": "wave{wave}_site_wide_flags.md",
            "qaFile": "wave{wave}_questions_session_{bucketUpper}.md",
            "discoveryFile": "wave{wave}_discovery_log_session_{bucketUpper}.md",
            "promptExtractDir": "wave{wave}_prompts",
            "briefSubdir": "wave{wave}",
            "cannibCheckFile": "wave{wave}_cannibalisation_check.md",
        },
    }
    path = ROOT / "sites" / f"{niche}.json"
    write_file(path, json.dumps(cfg, indent=2) + "\n")
    return path


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    p = argparse.ArgumentParser(description="Spin up a new niche site.")
    p.add_argument("--niche", required=True, help="Lowercase-hyphen slug (e.g. construction-cis)")
    p.add_argument("--display-name", required=True, help="Human brand name (e.g. 'Construction Finance Partners')")
    p.add_argument("--domain", required=True, help="Production domain (e.g. www.X.co.uk)")
    p.add_argument("--brand-primary", default="#1d4ed8", help="Primary brand colour hex")
    p.add_argument("--brand-on-primary", default="#ffffff", help="Text colour on brand-primary backgrounds")
    p.add_argument("--niche-summary", default="UK specialist accountants", help="One-line audience description")
    p.add_argument("--tranche", required=True, help="Expansion tranche id (e.g. 1, pilot); recorded in STATE.md + migration names")
    p.add_argument("--storage-prefix", required=True, help="Frozen analytics storagePrefix (2-4 lowercase chars); collision-checked")
    p.add_argument("--sites", default=None, help="Comma-separated site keys the tranche migration pair should cover (default: just --niche)")
    p.add_argument("--skip-db", action="store_true", help="Skip the live Supabase sites insert (tranche migrations cover registration)")
    p.add_argument("--dry-run", action="store_true", help="Print plan without writing files / DB rows")
    args = p.parse_args()

    if not slug_safe(args.niche):
        fail(f"--niche must be lowercase-hyphen (got {args.niche!r})")
    check_storage_prefix(args.storage_prefix)
    migration_keys = [s.strip() for s in (args.sites or args.niche).split(",") if s.strip()]
    if args.niche not in migration_keys:
        migration_keys.insert(0, args.niche)
    for k in migration_keys:
        if not slug_safe(k):
            fail(f"--sites entry must be lowercase-hyphen (got {k!r})")

    niche = args.niche
    display_name = args.display_name
    domain = args.domain
    root_domain = domain.removeprefix("www.")
    brand_primary = args.brand_primary
    brand_on_primary = args.brand_on_primary
    audience = args.niche_summary
    # Meta-length audit defect: live homepages shipped descriptions up to 185ch.
    # SERP truncation limit ~155-160; qa_verdict.py lints at 155.
    meta_description = audience if len(audience) <= 155 else audience[:152].rstrip() + "..."

    site_dir = ROOT / niche
    if site_dir.exists() and not args.dry_run:
        fail(f"Site directory already exists: {site_dir}")

    indexnow_key = generate_indexnow_key()

    print(f"Spinning up niche: {niche}")
    print(f"  Display name:    {display_name}")
    print(f"  Domain:          {domain}")
    print(f"  Brand primary:   {brand_primary}")
    print(f"  IndexNow key:    {indexnow_key}")
    print(f"  Target dir:      {site_dir.relative_to(ROOT)}")
    print(f"  Storage prefix:  {args.storage_prefix} (collision check passed)")
    print(f"  Tranche:         {args.tranche}")
    print(f"  Migration keys:  {', '.join(migration_keys)}")
    if args.dry_run:
        print("\n[DRY RUN] Would also emit: docs/{n}/STATE.md, supabase tranche migration pair, "
              "CI matrix entry, sites/{n}.json wave stub.".format(n=niche))
        print("[DRY RUN] Aborting before any writes.")
        return

    # ----- Write filesystem scaffold -----
    from datetime import datetime
    date_str = datetime.utcnow().strftime("%Y-%m-%d")

    write_file(site_dir / "niche.config.json", NICHE_CONFIG_JSON.format(
        niche=niche, display_name=display_name, domain=domain, root_domain=root_domain,
        tagline=audience, description=audience, brand_primary=brand_primary,
    ))
    write_file(site_dir / "pipeline" / "__init__.py", "")
    write_file(site_dir / "web" / "package.json", PACKAGE_JSON.format(niche=niche))
    write_file(site_dir / "web" / "next.config.ts", NEXT_CONFIG_TS.format(
        niche=niche, domain=domain, root_domain=root_domain,
    ))
    write_file(site_dir / "web" / "tsconfig.json", TSCONFIG_JSON)
    write_file(site_dir / "web" / "postcss.config.mjs", POSTCSS_CONFIG)
    write_file(site_dir / "web" / "vercel.json", VERCEL_JSON)
    write_file(site_dir / "web" / "src" / "app" / "globals.css", GLOBALS_CSS.format(
        brand_primary=brand_primary, brand_on_primary=brand_on_primary,
    ))
    write_file(site_dir / "web" / "src" / "app" / "layout.tsx", LAYOUT_TSX.format(
        display_name=display_name, description=meta_description, domain=domain,
    ))
    write_file(site_dir / "web" / "src" / "app" / "icon.svg", ICON_SVG.format(
        brand_primary=brand_primary, brand_on_primary=brand_on_primary,
        initial=display_name[:1].upper(),
    ))
    write_file(site_dir / "web" / "src" / "app" / "api" / "og" / "route.tsx", OG_ROUTE_TSX.format(
        display_name=display_name, brand_primary=brand_primary, root_domain=root_domain,
    ))
    write_file(site_dir / "web" / "src" / "app" / "page.tsx", PAGE_TSX.format(
        display_name=display_name, tagline=audience,
    ))
    write_file(site_dir / "web" / "public" / f"{indexnow_key}.txt", indexnow_key)

    print(f"\n[OK] Wrote site scaffold to {site_dir.relative_to(ROOT)}")

    # ----- Update root package.json workspaces -----
    root_pkg_path = ROOT / "package.json"
    root_pkg = json.loads(root_pkg_path.read_text(encoding="utf-8"))
    ws = root_pkg.get("workspaces", [])
    new_ws = f"{niche}/web"
    if new_ws not in ws:
        ws.append(new_ws)
        root_pkg["workspaces"] = ws
        root_pkg_path.write_text(json.dumps(root_pkg, indent=2) + "\n", encoding="utf-8")
        print(f"[OK] Added {new_ws} to root workspaces")
    else:
        print(f"[SKIP] {new_ws} already in root workspaces")

    # ----- Add to optimisation_engine/indexing/config.py -----
    indexing_cfg_path = ROOT / "optimisation_engine" / "indexing" / "config.py"
    cfg_src = indexing_cfg_path.read_text(encoding="utf-8")
    new_entry = f'    "{niche}": {{\n        "host": "{domain}",\n        "key": "{indexnow_key}",\n    }},\n'
    # Insert as the first entry of the SITE_INDEXNOW_CONFIG dict (the old
    # "# Medical + Solicitors:" comment marker no longer exists in the file).
    import re
    marker_re = re.compile(r"(SITE_INDEXNOW_CONFIG[^\n]*=\s*\{\n)")
    if f'"{niche}"' not in cfg_src:
        if not marker_re.search(cfg_src):
            print(f"[WARN] SITE_INDEXNOW_CONFIG dict not found in indexing/config.py; add {niche!r} entry manually")
        else:
            cfg_src = marker_re.sub(lambda m: m.group(1) + new_entry, cfg_src, count=1)
            indexing_cfg_path.write_text(cfg_src, encoding="utf-8")
            print(f"[OK] Added IndexNow key for {niche!r} to indexing/config.py")

    # ----- Write blog_generator site_config -----
    # Python identifiers can't contain hyphens; the filename uses underscores
    # while the site_key inside the config keeps its hyphenated form. The
    # site_configs/__init__.py auto-discovers and keys by site_key.
    site_cfg_filename = niche.replace("-", "_") + ".py"
    site_cfg_path = ROOT / "optimisation_engine" / "blog_generator" / "site_configs" / site_cfg_filename
    write_file(site_cfg_path, SITE_CONFIG_PY.format(
        niche=niche, display_name=display_name, domain=domain,
        audience=audience, date=date_str,
    ))
    print(f"[OK] Wrote blog_generator site_config: {site_cfg_path.relative_to(ROOT)}")

    # ----- Update routing_safety.py EXPECTED_SITE_PREFIXES -----
    rs_path = ROOT / "optimisation_engine" / "blog_generator" / "routing_safety.py"
    rs_src = rs_path.read_text(encoding="utf-8")
    if f'"{niche}":' not in rs_src:
        marker = '    "generalist": "generalist",'
        if marker in rs_src:
            new_line = f'    "{niche}": "{niche}",\n'
            rs_src = rs_src.replace(marker, marker + "\n" + new_line.rstrip("\n"), 1)
            rs_path.write_text(rs_src, encoding="utf-8")
            print(f"[OK] Added {niche!r} to EXPECTED_SITE_PREFIXES")

    # ----- Verify site_config auto-registration -----
    # site_configs/__init__.py auto-discovers per-site modules; no manual
    # registry edit needed. Import the generated module directly (not the
    # package, which would re-validate every site) and confirm the site_key.
    import importlib.util
    spec = importlib.util.spec_from_file_location(f"_spinup_check_{niche.replace('-', '_')}", site_cfg_path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    if mod.SITE_CONFIG.get("site_key") != niche:
        fail(f"Generated site_config {site_cfg_path.name} has wrong site_key {mod.SITE_CONFIG.get('site_key')!r}")
    print(f"[OK] site_config auto-registers via site_configs/__init__.py discovery (site_key={niche!r} verified)")

    # ----- Emit docs/<niche>/STATE.md -----
    state_path = ROOT / "docs" / niche / "STATE.md"
    write_file(state_path, STATE_MD.format(
        niche=niche, display_name=display_name, domain=domain, root_domain=root_domain,
        date=date_str, tranche=args.tranche, storage_prefix=args.storage_prefix,
    ))
    print(f"[OK] Wrote {state_path.relative_to(ROOT)} (brand_locked: false)")

    # ----- Emit tranche Supabase migration pair -----
    date_compact = date_str.replace("-", "")
    site_rows = []
    for k in migration_keys:
        if k == niche:
            site_rows.append({"site_key": k, "display_name": display_name, "domain": domain,
                              "root_domain": root_domain, "audience": audience})
        else:
            # Batch sibling scaffolded separately; placeholders flagged for the applier.
            site_rows.append({"site_key": k, "display_name": f"TODO_{k}", "domain": f"TODO.{k}.co.uk",
                              "root_domain": f"TODO.{k}.co.uk", "audience": "TODO"})
    mig1 = ROOT / "supabase" / "migrations" / f"{date_compact}000001_add_tranche_{args.tranche}_to_sites.sql"
    mig2 = ROOT / "supabase" / "migrations" / f"{date_compact}000002_add_tranche_{args.tranche}_to_leads_source.sql"
    write_file(mig1, build_sites_migration(site_rows, date_compact, args.tranche))
    write_file(mig2, build_leads_migration(migration_keys, date_compact, args.tranche))
    print(f"[OK] Emitted tranche migrations: {mig1.name}, {mig2.name} (NOT applied; run via Management API)")

    # ----- CI matrix entry -----
    insert_ci_matrix_entry(niche, domain)

    # ----- sites/<niche>.json wave-config stub -----
    wave_path = write_sites_wave_config(niche, display_name, domain)
    print(f"[OK] Wrote {wave_path.relative_to(ROOT)} (batchSize 1, single bucket 'a')")

    # ----- Insert row in Supabase `sites` -----
    if args.skip_db:
        print("[SKIP] Live Supabase sites insert (--skip-db; apply the tranche migrations instead)")
        _print_manual_gates(niche, domain, root_domain)
        return
    sites_payload = {
        "site_key": niche,
        "display_name": display_name,
        "domain": domain,
        "gsc_property_url": f"sc-domain:{root_domain}",
        "niche": niche,
        "target_buyer_persona": audience,
        "content_dir": f"{niche}/web/content/blog",
        "git_repo_path": f"{niche}/web",
        "blog_topics_table": "blog_topics",  # all sites share post Phase 4
        "active": True,
    }
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal,resolution=merge-duplicates",
    }
    r = requests.post(
        f"{SUPABASE_URL.rstrip('/')}/rest/v1/sites",
        headers=headers,
        json=sites_payload,
        timeout=15,
    )
    if r.status_code in (200, 201, 204):
        print(f"[OK] Added {niche!r} row to Supabase sites table")
    else:
        print(f"[WARN] Sites insert: {r.status_code} {r.text[:200]}")

    _print_manual_gates(niche, domain, root_domain)


def _print_manual_gates(niche: str, domain: str, root_domain: str) -> None:
    print()
    print("=" * 70)
    print(f"MANUAL GATES — complete these to bring {niche} live:")
    print("=" * 70)
    print(f"""
1. Buy the domain {domain.removeprefix('www.')} (any registrar; <£1/year for .co.uk)

2. In Vercel dashboard:
   - Create new project named "{niche}"
   - Set Root Directory to "{niche}/web"
   - Set Framework Preset to "Next.js" (critical — null framework causes routes to 404)
   - Add env vars (same as other sites):
       NEXT_PUBLIC_SUPABASE_URL
       NEXT_PUBLIC_SUPABASE_ANON_KEY

3. Configure DNS for {domain} to point at Vercel
   (Vercel will show the required A/CNAME records when you add the domain)
   - When adding the apex domain {domain.removeprefix('www.')}, set its redirect to
     {domain} as PERMANENT (308), not temporary (estate audit: 4 live sites emit 307)

4. Google Search Console:
   - Add property: sc-domain:{root_domain}
   - Verify ownership (DNS TXT record)

5. Google Analytics 4:
   - Create property for {domain}
   - Get measurement ID, paste into {niche}/niche.config.json if you have analytics wiring

6. Locally:
   - cd {ROOT}
   - npm install                                  # picks up the new workspace
   - cd {niche}/web && npm run build              # smoke test

7. Keyword research + content:
   - Populate blog_topics with site_key="{niche}":
       python -m optimisation_engine.ingestion.broaden_keyword_pool --site {niche}
     (or seed manually via INSERT)
   - Generate initial content:
       python -m optimisation_engine.blog_generator --site {niche}  (loop)

8. Deploy (after manual gates done):
   - Pull Vercel project link to repo root, then `vercel deploy --prod` from there
""")


if __name__ == "__main__":
    main()
