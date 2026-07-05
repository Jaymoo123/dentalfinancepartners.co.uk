# Wave 2-3 pre-build parity audit: Dentists + Medical (2026-07-06)

Explore-agent audit vs the R1/R2/R3 feature list + 71-capability standard. Feeds the wave-2 (Dentists) and wave-3 (Medical) build briefs. Both sites are Phase-D standardised shells: shared analytics/console/tools/schema adopted, **zero R1/R2/R3 CRO components exist on either** (grep across both src trees for every R1-R3 component returns nothing). Shared machinery ready and unused: `createLeadSubmitHandler`, empty experiment registries, visitMemory.

## Dentists (Dentists/web, dentalfinancepartners.co.uk) — verdict: READY, moderate prep

R1-R3 state: no /api/leads/ dir; LeadForm uses shared `submitLead` (good) BUT honeypot `company_url` with client-side SILENT DROP at `src/components/forms/LeadForm.tsx:94` + raw `window.gtag("generate_lead")` at :154-163; no MiniCapture/CalcResultCta (calc pages have a static page-level CTA to /free-practice-health-check only); no intent layer; legacy StickyCTA (scroll-30%, untracked, unpersisted, mounted via PageShell); renderer = single bottom LeadForm at `BlogPostRenderer.tsx:235`; no premium fleet; /dental-guides = 6 ungated md guides with own parser (no assertFrontmatter); no widget/assistant. No newsletter surfaces (nothing to retire).

Registry: 5 tools (uda-value, associate-take-home, practice-valuation, locum-structure, principal-extraction), golden-tested (52). Premium candidates: principal-extraction, locum-structure, practice-valuation.
Blog: nested /blog/[category]/[slug]; `src/middleware.ts` owns 74 legacy-flat + 16 duplicate 301s (matcher /blog/:path*) — COMPOSE, never replace. Frontmatter rich (keyTakeaways/updatedDate/sourcesVerifiedAt) via shared assertFrontmatter. next/image hero (image hygiene OK). Analytics: full shared stack, prefix `dfp` FROZEN, GA4 consent-gated OK, opt-out posture, noTrackPrefixes /admin+/embed.

Beyond-R1R3 gaps: "Do not track me" footer control PROMISED (layout.tsx:78, cookie-policy:52,91) but MISSING; sitemap missing /dental-guides(+slugs), 4× /for-*, /free-practice-health-check AND emits ~12 derived category-hub URLs while only 5 static hubs exist (7 sitemap 404s); NO dynamic /blog/[category] route while breadcrumb at BlogPostRenderer.tsx:74 links category hubs → **404 on ~83 posts**; hub filters case-sensitive (`p.category === "Associate tax"` misses 19 "Associate Tax" posts); hand-written JSON-LD @context in hubs; health-check `Wizard.tsx` = public write surface with NO honeypot + `phone:"—"` sentinel at :187; niche-loader blind-casts; calc pages hardcode "UK 2025/26 rates" (stale copy, we are in 2026/27).

STALE FACTS (STOP-rule goldens pin them; fixes = manager-ordered explicit corrections with regenerated goldens, precedent = Solicitors R2/NIC):
- `compute/locum-structure.ts:36-38` + `principal-extraction.ts:29-31`: NI_SECONDARY=9100, EMPLOYER_NI=0.138 (truth: 15% above £5,000 from 6 Apr 2025; HP :448).
- Dividends 8.75/33.75/39.35 in both libs + TOOLS.md:157-159 (truth: 10.75/35.75/39.35 from 6 Apr 2026).
- AMAP unused in compute; any new mileage tool = 55p first-10k (HP :322).

Quirks: tokens navy #001b3d + gold #b8975d in globals.css (niche.config brand.primary_color #2563eb is WRONG — CSS is truth); fonts Plus Jakarta Sans + Cormorant Garamond; Tailwind v4; partner=Reflex; phone is placeholder-range; embed msg `dfp-embed-height`; docs = docs/dentists/{TOOLS,house_positions,STATE}.md.
Taxonomy raw material (12 real categories, casing variants merge at slug; 204 posts): practice-accounting 27, associate-tax 32, practice-finance 29, capital-allowances-and-equipment 18, buying-a-practice 17, nhs-contracts 16, vat-and-compliance 16, goodwill-and-practice-sale 15, nhs-pension 14, locum-tax 11, general 7, specialist-services 2. Config lists only 5. /for-*: associates, principals, practice-buyers, locum-dentists. Lead roles: Associate dentist/Practice owner/Multi-practice group/Other.

## Medical (Medical/web, medicalaccounts.co.uk) — verdict: READY WITH CAUTION, larger prep

R1-R3 state: LeadForm = WORST in estate: raw `fetch(rest/v1/leads)` anon-key at `src/components/forms/LeadForm.tsx:145-154`, `company_url` silent drop at :92, leftover console.log at :162, hidden practiceName field, env vars read directly; legacy StickyCTA; renderer bottom-LeadForm only (:125-135); no premium fleet; /medical-guides = hardcoded TS array `src/lib/medical-guides-data.ts` (NOT files — ResourceGate needs a data-model decision); no widget/assistant; no newsletter surfaces.

Registry: 3 tools only (nhs-pension-annual-allowance, locum-tax-calculator, private-practice-incorporation), 19 goldens. Premium candidates: NHS-pension taper/carry-forward, incorporation multi-year.
Blog: **FLAT /blog/[slug]** (confirmed; use scripts/medical_flat_link_audit.py, never nested tooling); middleware = 16 duplicate 301s; renderer diverges structurally: boxed header (no hero), **raw `<img>` at BlogPostRenderer.tsx:79-86**, site-LOCAL TableOfContents/ReadingProgress copies, NO keyTakeaways/updatedDate/sourcesVerifiedAt in parse or types (0/73 — WS8 surface build required), no category crumb, JSON-LD inside <article>.
Analytics: shared stack, prefix `ma` FROZEN, **GA4 NOT consent-gated** (unconditional site-local GoogleAnalytics in <head> layout.tsx:75-77; ConsentedScripts mounted WITHOUT gaMeasurementId :98); noTrackPrefixes missing /embed; "Do not track me" promised (layout.tsx:83) but missing.

Beyond-R1R3: sitemap hubs OK (8 static match derived) but missing /medical-guides(+slugs), 4× /for-*, /free-practice-health-check; hubs hand-registered (config's "Consultant Tax" has 0 posts, no hub); env example claims WRONG domain (medicalfinancepartners.co.uk) + unused RESEND_API_KEY; `MedicalHealthCheckWizard.tsx` NO honeypot + phone "—" sentinel :230; services page flat (no /services/[slug]); niche-loader double-blind-cast.

FACTS: `compute/incorporation.ts:42-44` dividends ALREADY CORRECT 2026/27 (header comment mislabels as "1.25pp uplift" — it's +2pp); **TOOLS.md:77-81 STALE vs its own code** (documents 8.75/33.75 + "employer £9,100" beside "15% from Apr 2025" — internally inconsistent; compute libs model NO employer NI at all, so doc-only rot but poisons premium briefs); AMAP 55p/25p for 2026/27 (HP :234) unused; student-loan 2026/27 thresholds not yet reviewed.

Quirks: actual tokens navy #001b3d + copper #b87333 (teal/coral names are ALIASES onto navy/copper; config #0891b2 wrong — CSS is truth); extra deps radix-accordion/lucide/clsx/tw-merge; `.vercel` at Medical/.vercel (NOT Medical/web/); embed msg `ma-embed-height`; GA G-CQF7KFZ1P6; google_site_verification empty; 5 locations.
Taxonomy (8 categories, 73 posts): gp-practice-management 20, gp-accountant-services 16, gp-tax-and-accounts 16, nhs-pension-planning 8, locum-tax 6, incorporation-and-company-structures 4, private-practice 2, medical-expenses 1 (+config "Consultant Tax" 0). /for-*: gps, consultants, locum-doctors, junior-doctors. Guide slug `nhs-pension-annual-allowance` collides semantically with the calculator slug. Lead roles: GP salaried/GP partner/Locum/Consultant/Private practice owner/Other.

## Five biggest risks (both waves)
1. Live lead loss until R1 lands (company_url silent drop both LeadForms; Medical raw anon insert) — chokepoint + enquiry_ref ships FIRST in each wave.
2. Stale tax constants behind STOP-rule goldens (Dentists NIC 13.8%/9,100 + dividends 8.75; Medical TOOLS.md contradicting code) — explicit manager-ordered rate refresh with regenerated goldens BEFORE premium derivation.
3. Dentists taxonomy structurally broken (12 real vs 5 config categories, dual casing, 83 posts with 404 breadcrumbs) — taxonomy from CONTENT truth, ship dynamic [category] hub in the same wave.
4. Compliance drift (both promise a non-existent opt-out; Medical GA4 ungated under opt-out posture) — fix inside R1-equivalents before personalisation default-ON widens exposure.
5. Medical structural divergence (flat routing, .vercel location, TS-array guides, local renderer forks, missing /embed noTrack, wrong env-example domain) — every Property/Solicitors-templated pattern must be explicitly re-checked.
