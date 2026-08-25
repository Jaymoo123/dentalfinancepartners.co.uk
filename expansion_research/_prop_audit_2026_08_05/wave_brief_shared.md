# Shared brief - Property money-tier wave (2026-08-05)

Applies to every page in this wave. Your page-specific brief names the route, cluster and terms.

## Site + code context
- Site: Property Tax Partners (www.propertytaxpartners.co.uk), Next.js App Router at Property/web/.
- Create ONLY your own route directory (e.g. Property/web/src/app/services/property-accountant/page.tsx). Model the code style on Property/web/src/app/incorporation/page.tsx and services/page.tsx (server components, metadata export, sections, Tailwind classes used on those pages, shared components from src/components).
- DO NOT EDIT any shared file: sitemap.ts, niche.config.json, middleware.ts, layout.tsx, site.ts, schema.ts, any existing page, any blog post. The manager integrates nav + sitemap afterwards. If you need a helper that does not exist, inline it in your page file.
- Frozen (never touch): homepage, /contact, /book, /thank-you, /complete, /calculators hub, the five registry calculators, everything in docs/_engines/property_frozen_pages.md.
- Schema: emit JSON-LD inline in your page: Service (with provider Organization Property Tax Partners, areaServed GB) + FAQPage for your FAQ section + BreadcrumbList. Follow the shape used in src/lib/schema.ts but inline; do not modify schema.ts.
- Lead capture: reuse the existing contact CTA pattern from incorporation/page.tsx (links to /contact). Embed relevant calculators via links to /calculators/<slug> where natural.

## Content standard (locked rules, violating any = failure)
- Read docs/_engines/VOICE_STANDARD.md first and follow it. Second person, plain British English, no meta-commentary, no SEO-architecture talk in prose, no signposting filler.
- NO em-dashes anywhere (use commas, parentheses, full stops).
- No named experts, credentials, quotes, or individual practitioners. No client names. No phone numbers. Anonymised social proof only, no pricing promises.
- A* bar: the page must be genuinely useful to a UK landlord/investor deciding whether to hire this service. Cover: what the service covers, who it is for (scenarios), how engagement works, what it costs is framed as "depends, book a consultation" (no figures), why a specialist vs generalist, and a substantial FAQ (8+ questions matching real query language). Not thin, not keyword-holding.
- Tax facts ground truth (2026/27, FA 2026 enacted 18 Mar 2026): Section 24 reducer rises to 22% from April 2027 (20% now); WDA 18%->14%, new 40% FYA, special rate 6%; MTD for landlords over 50k from April 2026, over 30k April 2027; dividend rates 10.75%/35.75%/39.35% from 6 Apr 2026; employer NIC 15%/GBP 5,000; BADR 18% from 6 Apr 2026; IHT thresholds frozen to 5 Apr 2031; BR/APR combined cap GBP 2.5m. If your page cites a rate not listed here, verify against the ground-truth memory docs or omit.

## Collision pre-flight (cannibalisation guard)
One page owns one cluster. Your metaTitle must not collide with: homepage "Property Accountants UK | Specialist Landlord Tax Advice" (frozen), /services (being narrowed to "Property Accounting Services" hub framing), the other wave pages (see your brief's neighbour list), /property-tax-rates ("UK Property Tax Rates 2026/27 | Landlord Tax Reference"), /research/landlord-tax-index, /calculators/section-24-calculator ("Section 24 Tax Calculator..."), /calculators/mtd-checker, and the 10 blog category hubs. Use your assigned primary phrasing exactly; do not drift into a neighbour's terms.

## Data sources
- Term cluster + volumes: docs/_engines/PROPERTY_SEO_SURFACE_MAP_2026-08-05.md (your Tier-1 row + its Tier-2 sub-terms). Fold sub-term language into H2s/FAQ naturally.
- Feeding posts: link 4-8 relevant existing blog posts from content/blog/ in-body (real cross-references, no "pillar/cluster" language).

## QA before you commit
- npx tsc --noEmit in Property/web must pass.
- python scripts/voice_scan.py <your page file> if the script accepts tsx; if not, self-check against VOICE_STANDARD.md.
- Zero em-dashes (grep your file).
- Commit on expansion/phase-0: "feat(property): <route> money page" + Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>. Do NOT push, do NOT deploy.
