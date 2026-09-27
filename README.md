# Multi-Niche Accounting Platform

UK niche accountancy websites on one platform, deployed on Vercel, with automated content
generation and lead capture.

**The estate is 17 site folders carrying 2,582 blog posts** (re-counted 23 September 2026). The
four below are the original and largest; the other thirteen are listed under "Wider estate".

| Site | Domain | Folder |
|------|--------|--------|
| Property Tax Partners | [propertytaxpartners.co.uk](https://www.propertytaxpartners.co.uk) | `Property/` |
| Dental Finance Partners | [dentalfinancepartners.co.uk](https://www.dentalfinancepartners.co.uk) | `Dentists/` |
| Medical Accountants UK | [medicalaccounts.co.uk](https://www.medicalaccounts.co.uk) | `Medical/` |
| Accounts for Lawyers | [accountsforlawyers.co.uk](https://www.accountsforlawyers.co.uk) | `Solicitors/` |

## Wider estate

Thirteen further site folders follow the same `niche.config.json` + `web/` + `pipeline/` shape.
Post counts are as at 23 September 2026.

| Folder | Brand | Domain | Posts |
|---|---|---|---:|
| `generalist/` | Holloway Davies | hollowaydavies.co.uk | 475 |
| `digital-agency/` | Agency Founder Finance | agencyfounderfinance.co.uk | 306 |
| `wills-probate/` | Probate Compass | **placeholder domain** | 146 |
| `construction-cis/` | Trade Tax Specialists | tradetaxspecialists.co.uk | 82 |
| `contractors-ir35/` | Contractor Tax Accountants | contractortaxaccountants.co.uk | 62 |
| `divorce-finances/` | (unnamed) | **placeholder domain** | 45 |
| `startups-tech/` | Founder Tax Partners | foundertaxpartners.co.uk | 32 |
| `charities/` | Trustee Tax | trusteetax.co.uk | 24 |
| `hospitality/` | Hospitality Tax | hospitalitytax.co.uk | 23 |
| `pharmacies/` | Pharmacy Tax | pharmacytax.co.uk | 22 |
| `care/` | Care Home Tax | carehometax.co.uk | 19 |
| `crypto/` | Crypto Tax Partners | cryptotaxpartners.co.uk | 19 |
| `ecommerce/` | Ecommerce Finance | ecommercefinance.co.uk | 14 |

Domains are as configured in each `niche.config.json`; the two placeholders are tracked as W-001
in `Admin/ISSUE_LOG.md`. Content generation across the whole estate has been unscheduled since the
optimisation engine was retired on 2026-09-09 (I-004); the newest post anywhere is 2026-09-11.

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

Last updated: 23 September 2026
