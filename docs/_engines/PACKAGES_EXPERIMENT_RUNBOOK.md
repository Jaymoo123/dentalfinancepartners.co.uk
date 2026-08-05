# Self-serve packages experiment (pkg_pricing_v1) - runbook

Built 2026-08-05. Painted-door test: 3 priced compliance tiers + project-work
fixed-quote card per site, signup = normal lead-form fill tagged
`extras.form_id=package_signup`. Plan: `~/.claude/plans/i-have-a-seperate-ethereal-popcorn.md`.

## Commits (branch expansion/phase-0)

| Commit | Scope |
|---|---|
| `2a4f3073` | Shared pricing module + /pricing on 5 non-Property sites + registries + console card + view migration |
| `1c066426` | Property /pricing + submit-route gate |
| `2cc693f8` | Reflex named-partner removal (NOT part of the experiment, do not revert) |
| `48583162` | Tailwind source fix (KEEP) + button/modal polish + homepage packages on 5 sites |
| `dc37dfa6` | Qualifier support + PricingPromoCard blog surface (5 sites) |
| `57568a1b` | Property nav restructure (KEEP) + homepage + qualifier + blog promo |

## Surfaces (per site)

1. `/pricing` route: `{site}/web/src/app/pricing/page.tsx` + `{site}/web/src/config/packages.ts`
2. Nav + footer links: `{site}/niche.config.json` ("Pricing" entries)
3. Homepage: packages section in `{site}/web/src/app/page.tsx` (replaced the old ServiceTiers "Choose your level of support" sections; originals recoverable from git parent of `48583162` / `57568a1b`)
4. Blog: `<PricingPromoCard .../>` in `{site}/web/src/components/blog/BlogPostRenderer.tsx`
5. Sitemap: `/pricing` in `{site}/web/src/app/sitemap.ts`
6. Shared: `packages/web-shared/pricing/` (PackagesSection, PricingPromoCard, types, faq-schema) + exports in `packages/web-shared/package.json`
7. Experiment: `pkg_pricing_v1` entry in `packages/web-shared/experiments/registries/{property,generalist,dentists,medical,solicitors,construction}.ts`
8. Console: `getPackageFunnel` in `packages/web-shared/console/adminData.ts` + package card in `console/web/src/app/site/[siteKey]/page.tsx`
9. DB: view `public.vw_package_funnel` (`supabase/migrations/20260805000001_package_funnel_view.sql`)
10. Property submit route: `isPackageSignup` early-return block in `Property/web/src/app/api/leads/submit/route.ts`

## Isolation keys (differentiating pricing traffic from the lead-gen funnel)

Every pricing surface is keyed; nothing shares an identifier with the classic
enquiry funnel:

| Signal | Key | Where |
|---|---|---|
| Tier CTA click | `cta_click` with `props.cta = 'package_signup'` + `package_id` | web_events, vw_cta_performance (own row per cta id) |
| Blog promo click | `cta_click` with `props.cta = 'pricing_promo'` | web_events |
| Signup form lifecycle | `form_start/form_field_focus/form_submit/lead_submitted` with `props.form_id = 'package_signup'` | web_events, vw_form_lead_counts (own row per form_id) |
| Qualifier answer | `custom_interaction` with `props.kind = 'pricing_qualifier'` | web_events |
| Page traffic | `page_view` with `page_path = '/pricing'` | web_events |
| Experiment stamp | `props.exp = 'pkg_pricing_v1:on'` | every event from an exposed visitor |
| Lead rows | `extras.form_id = 'package_signup'`; `extras.package_id = 'advisory_project'` = quote request | leads table; `leadKind()` in console adminData |

Console: leads ledger badges package/quote rows; the site Experiments tab
package card shows the enquiry vs package vs quote lead-table split
(`getLeadKindCounts`). CAVEAT: the headline `estate_kpis` RPC counts ALL leads
rows (package signups included) in `leads_all` / conversion KPIs; read the
split line or filter `extras->>'form_id' IS DISTINCT FROM 'package_signup'`
when the distinction matters. Deliberately unchanged to keep the RPC stable.

Enquiry-side isolation: classic lead forms all carry their own `form_id`s and
`data-cta` ids, so excluding pricing is always `props->>'form_id' <>
'package_signup'` (events) or the extras filter above (leads).

## Full reversal (kill the experiment cleanly)

Order matters only for builds; data is untouched throughout (leads keep their
`extras.package_id` rows; web_events history stays).

1. Soft-kill first (optional intermediate state): set `pkg_pricing_v1` `status: "off"` in the 6 registries. Stops exposure stamping; UI stays.
2. Per site (6 sites): delete `src/app/pricing/`, `src/config/packages.ts`; remove "Pricing" entries from `niche.config.json` navigation + footer_links; remove `/pricing` from `sitemap.ts`; remove the `PricingPromoCard` import + render from `BlogPostRenderer.tsx`; restore the homepage tiers section from git (the section removed in `48583162` / `57568a1b`, component imports included).
3. Property only: remove the `isPackageSignup` early-return block from the submit route.
4. Shared: delete `packages/web-shared/pricing/` + its 4 export lines; remove `pkg_pricing_v1` entries (experiments + meta) from the 6 registries; remove `getPackageFunnel`/`PackageFunnelRow` from `adminData.ts` and the package-funnel block + imports from the console page.
5. DB: `DROP VIEW IF EXISTS public.vw_package_funnel;` (new dated migration).
6. Redirects: add `/pricing -> /services` permanent redirect per site if the pages were live long enough to be indexed (check GSC first).

## Do NOT revert (independent keepers)

- Tailwind `@source "../../../../packages/web-shared"` lines in all 6 `globals.css` (fixes class pruning for ALL shared components, predates-experiment bug).
- Property nav restructure (Services/Resources dropdowns, `children` support in `niche-loader.ts`, Contact link) in `SiteHeader.tsx` + `niche.config.json` (keep the nav shape, just drop the Pricing link).
- Reflex removal (`2cc693f8`).

## Graduation path (if the experiment wins)

Billing provider + AML supervision (HMRC MLR) before delivering; consent
wording pass for package signups (currently reuses partner-network lead
consent, over-discloses); intro-price anchoring field; qualifier rollout to
remaining sites; price A/B via weighted registry arms.
