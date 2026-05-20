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
    "publisher_logo_url": "/og-placeholder.svg"
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

export const metadata: Metadata = {{
  title: "{display_name}",
  description: "{description}",
}};

export default function RootLayout({{
  children,
}}: {{
  children: React.ReactNode;
}}) {{
  return (
    <html lang="en-GB">
      <body>{{children}}</body>
    </html>
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

    "llm_provider": "deepseek",
    "llm_model": "deepseek-chat",
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
    p.add_argument("--dry-run", action="store_true", help="Print plan without writing files / DB rows")
    args = p.parse_args()

    if not slug_safe(args.niche):
        fail(f"--niche must be lowercase-hyphen (got {args.niche!r})")

    niche = args.niche
    display_name = args.display_name
    domain = args.domain
    root_domain = domain.removeprefix("www.")
    brand_primary = args.brand_primary
    brand_on_primary = args.brand_on_primary
    audience = args.niche_summary

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
    if args.dry_run:
        print("\n[DRY RUN] Aborting before any writes.")
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
    write_file(site_dir / "web" / "next.config.ts", NEXT_CONFIG_TS.format(niche=niche))
    write_file(site_dir / "web" / "tsconfig.json", TSCONFIG_JSON)
    write_file(site_dir / "web" / "postcss.config.mjs", POSTCSS_CONFIG)
    write_file(site_dir / "web" / "vercel.json", VERCEL_JSON)
    write_file(site_dir / "web" / "src" / "app" / "globals.css", GLOBALS_CSS.format(
        brand_primary=brand_primary, brand_on_primary=brand_on_primary,
    ))
    write_file(site_dir / "web" / "src" / "app" / "layout.tsx", LAYOUT_TSX.format(
        display_name=display_name, description=audience,
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
    marker = "    # Medical + Solicitors:"
    if niche not in cfg_src:
        cfg_src = cfg_src.replace(marker, new_entry + marker, 1)
        indexing_cfg_path.write_text(cfg_src, encoding="utf-8")
        print(f"[OK] Added IndexNow key for {niche!r} to indexing/config.py")

    # ----- Write blog_generator site_config -----
    site_cfg_path = ROOT / "optimisation_engine" / "blog_generator" / "site_configs" / f"{niche}.py"
    write_file(site_cfg_path, SITE_CONFIG_PY.format(
        niche=niche, display_name=display_name, domain=domain,
        audience=audience, date=date_str,
    ))
    print(f"[OK] Wrote blog_generator site_config: {site_cfg_path.relative_to(ROOT)}")

    # ----- Update site_configs/__init__.py registry -----
    site_configs_init = ROOT / "optimisation_engine" / "blog_generator" / "site_configs" / "__init__.py"
    init_src = site_configs_init.read_text(encoding="utf-8")
    if f'"{niche}"' not in init_src:
        # Best-effort insertion: append a registration line at the end of the SITE_CONFIGS dict.
        # If the file uses a different pattern, the user will need to add manually.
        print(f"[WARN] Manual step: register {niche!r} in optimisation_engine/blog_generator/site_configs/__init__.py")

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

    # ----- Insert row in Supabase `sites` -----
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

    # ----- Manual gates checklist -----
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
