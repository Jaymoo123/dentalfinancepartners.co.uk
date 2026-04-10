# Multi-Niche Accounting Platform

4 UK niche accountancy websites. All live, deployed on Vercel, with automated content generation and lead capture.

| Site | Domain | Folder |
|------|--------|--------|
| Property Tax Partners | [propertytaxpartners.co.uk](https://www.propertytaxpartners.co.uk) | `Property/` |
| Dental Finance Partners | [dentalfinancepartners.co.uk](https://www.dentalfinancepartners.co.uk) | `Dentists/` |
| Medical Accountants UK | [medicalaccountantsuk.co.uk](https://www.medicalaccountantsuk.co.uk) | `Medical/` |
| Accounts for Lawyers | [accountsforlawyers.co.uk](https://www.accountsforlawyers.co.uk) | `Solicitors/` |

## For AI Agents — Read These First

| What | Where | Purpose |
|------|-------|---------|
| Project architecture | `.cursor/rules/project-context.mdc` | Full context: folder structure, config system, blog pipeline, site differences, gotchas, conventions |
| Issue tracking protocol | `.cursor/rules/agent-workflow.mdc` | How to check, log, categorise, and resolve issues |
| Live issue log | `Admin/ISSUE_LOG.md` | All open and resolved issues with severity, site scope, and file paths |
| Historical audit | `Admin/PLATFORM_AUDIT_2026-04-02.md` | 32-item audit snapshot from April 2026 |
| Editorial pipeline lessons | `Admin/EDITORIAL_PIPELINE_LESSONS.md` | Known failure modes, root causes, and code guardrails for the content optimization pipeline |

**Before reporting any bug or issue**, check `Admin/ISSUE_LOG.md` first. The Quick Lookup index at the top shows which issues affect each site.

**Before running the editorial optimization pipeline**, read `Admin/EDITORIAL_PIPELINE_LESSONS.md` for known failure modes and the guardrail checklist.

## Quick Start

```bash
# Dev server (from any site's web/ directory)
cd Property/web && npm run dev    # http://localhost:3000
cd Dentists/web && npm run dev
cd Medical/web && npm run dev
cd Solicitors/web && npm run dev

# Build / Lint
npm run build
npm run lint
```

## Folder Structure

```
Accounting/
├── Property/           # Each site follows this pattern:
│   ├── niche.config.json   # Brand, domain, categories, nav, locations, SEO, lead form
│   ├── web/                # Next.js 15 app (src/app/, src/components/, content/blog/)
│   └── pipeline/           # Python blog generation (config + generator)
├── Dentists/           # Same structure
├── Medical/            # Same structure (flat blog URLs)
├── Solicitors/         # Same structure (different slugifyCategory)
├── shared/web-core/    # Canonical shared TS: lib, components, types
├── agents/             # Python orchestration (coordinator, blog gen, analytics, risk)
├── scripts/            # Utilities: scaffold, validate, sync, migrate
├── supabase/           # DB migrations
├── Admin/              # Audit docs, issue log, keyword CSVs
├── .cursor/rules/      # AI agent rules (project-context + agent-workflow)
└── .github/workflows/  # CI/CD (build, content quality, daily pipeline, analytics)
```

## Key Config Files

Each site is driven by `niche.config.json` → loaded by `src/config/niche-loader.ts` → mapped to `siteConfig` in `src/config/site.ts`. All pages, components, and schema reference `siteConfig`.

## Environment Variables

Required in each site's `web/.env.local`:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Last updated: 9 April 2026
