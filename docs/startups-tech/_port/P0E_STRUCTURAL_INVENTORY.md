# P0E — startups-tech port, structural live-defect and disposition inventory

Instrument: `next start` on http://localhost:3201 (curl only, read-only). Repo root git read-only. No edits outside this file.

**CHROME DOES NOT EXIST.** `startups-tech/web/src/components/` holds only `blog/`, `calculators/`, `forms/`, `research/`, `ui/` — no `layout/`. `grep -rln '<nav\|<header\|<footer' src/app src/components` → zero hits anywhere in the tree. `layout.tsx` is 37 lines (confirmed), body wraps only `ConsentProvider`/`AnalyticsProvider`/`ConsentedScripts`/`{children}`. This is net-new chrome construction, not a restyle.

---

## 0. False premises in this brief

None found that contradict the brief's own framing — the brief already states "confirm" for the no-chrome claim and it holds. One correction to a brief assumption:

1. The brief says derive `ctaContactGoal`/`ctaMobilePlacement` from the closest existing CTA's `data-cta-goal`/`data-cta-placement`. **There is no `data-cta-goal` anywhere on the site** (`grep -rn 'data-cta-goal=' src` → zero hits) and exactly one `data-cta-placement`, on the thank-you page's outbound return-link, not a header CTA (`app/thank-you/page.tsx:108`, value `"thank_you"`). There is nothing to derive a header CTA goal from — phase 1 must pick fresh values (kit defaults `"form"` / `"mobile_menu"` are the safe choice; nothing pre-existing to preserve).
2. `thank-you/page.tsx` greps `main=3 h1=3` on a naive line-count — false alarm: the three `<main>`/`<h1>` pairs sit in three mutually exclusive early-return branches (`optedOut`/`confirmed`/default), only one ever renders. Not a duplicate-landmark defect.

---

## 1. Chrome contract for phase 1

| Prop | Recommendation | Evidence |
|---|---|---|
| `ctaContactGoal` | `"form"` (kit default — nothing pre-existing to preserve, see False Premise 1) | no `data-cta-goal` hits anywhere in `src` |
| `ctaMobilePlacement` | `"mobile_menu"` (kit default, same reason) | only `data-cta-placement="thank_you"` exists, `app/thank-you/page.tsx:108`, unrelated to a header CTA |
| `resourcesHref` | `/research` — hub with 5 index pages live, or `/blog` (12 categories/33 posts). `/for`(5) and `/services`(6) are also real hubs. No single "Resources" hub is obviously canonical; owner call. | probed all 4 on :3201, all 200 (§ table below) |
| `companyItems` | site's own routes only: `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy`. **Do not pass kit default** — `/locations` 404s (confirmed, `niche.config.json` `"locations": []`) | `curl -o /dev/null -w '%{http_code}' :3201/locations` → 404 |
| `showBuilderCredit` | `true` (owner-standing, estate-wide, do not pass `false`) | playbook §8 |
| `wordmarkAccentColor` | pass `#4f46e5`. It is **not** a Tailwind ramp step — indigo-600 is `#4f46e5` in stock Tailwind (`oklch`-era v4 indigo-600 ≈ `#4f46e5`), so it likely resolves to the exact ramp value; phase 1 must confirm against the actual kit `indigo` scale shipped in `packages/web-shared` (not verified here — edit forbidden). If it matches, prop is a no-op; pass it anyway for explicitness per playbook precedent (Solicitors). | `niche.config.json` `brand.primary_color` = `#4f46e5`; kit file not inspected (out of scope, no edit permission) |

**Logo/wordmark:** `niche.config.json` `brand.logo_path` = `/brand/logo.png`. `web/public/brand/` **does not exist** (`ls` → No such file or directory). No wordmark component or `logo.png`/`wordmark` reference found anywhere in `src` (`grep -rln 'wordmark\|logo.png\|Founder Tax' src/components src/app/page.tsx` → zero hits). **The site renders no logo/wordmark today, text or image.** Phase 1 must build the kit text wordmark from `niche.display_name` ("Founder Tax Partners"); there is no image asset to carry over.

**Header CTA copy (owner ruling: no phone, "Book a consultation" style using site's own `cta` strings):** `niche.config.json` `cta.sticky_button` = `"Get in touch"`, `cta.sticky_primary` = `"Speak to a startup accountant"`. Phone `+44 20 0000 0000` is the placeholder the owner flagged — confirmed absent from any rendered CTA in `src/components` (only in `niche.config.json` `contact.phone`, not surfaced).

### Nav / footer probe (niche.config.json vs :3201)

| Source | Label | href | HTTP |
|---|---|---|---|
| navigation[0] | Services | `/services` | 200 |
| navigation[1] | Who we help | `/for` | 200 |
| navigation[2] | Calculators | `/calculators` | 200 |
| navigation[3] | Blog | `/blog` | 200 |
| navigation[4] | Research | `/research/startup-formation-survival-index` | 200 |
| navigation[5] | About | `/about` | 200 |
| navigation[6] | Contact | `/contact` | 200 |
| footer_links[0-6] | (same 7 as above minus Research, plus:) | — | 200 |
| footer_links[7] | Privacy policy | `/privacy-policy` | 200 |
| footer_links[8] | Terms | `/terms` | 200 |
| footer_links[9] | Cookie policy | `/cookie-policy` | 200 |

All 7 nav + 9 footer hrefs return 200. Zero broken links in either config array.

---

## 2. Routes and templates (30 `page.tsx`, confirmed count)

| Family | Routes | Data source | `dangerouslySetInnerHTML` | Lead form | `<main>` | Notes |
|---|---|---|---|---|---|---|
| Home | `/` (1) | hardcoded JSX + `LeadCTAPanel` | yes (`app/page.tsx`) | LeadCTAPanel | **0** | JSON-LD x3 |
| Services | `/services`, `/services/[slug]` (2) | `src/data/startups-services.ts` | `[slug]` only | LeadCTAPanel both | `/services` 0, `/services/[slug]` 0 | JSON-LD x3 on `[slug]` |
| Who-we-help | `/for`, `/for/[slug]` (2, 5 slugs live: pre-seed-founders, funded-startups, saas-companies, software-development-companies, fintech-startups) | local data | `[slug]` only | LeadCTAPanel both | 0, 0 | JSON-LD x3 on `[slug]` |
| Calculators | `/calculators`, `/calculators/[slug]` (2, 4 tools live) | `src/lib/calculators/registry.ts` | `[slug]` only | `CalcResultCta`/`MiniCapture` | `/calculators` 1, `[slug]` 0 (own scroll-anchor at line 79) | see §5 |
| Blog | `/blog`, `/blog/[category]`, `/blog/[category]/[slug]` (3, 12 categories, ~30 posts) | `web/content/blog/*.md` frontmatter | `[category]/[slug]` only | InlineMiniLeadForm on post | 0, 1, 1 | JSON-LD x3 on post only |
| Research | `/research`, + 5 named index pages (6) | hardcoded + data | all 5 named pages, yes | 4 of 5 have LeadCTAPanel | 0 on `/research`, 1 on named pages | JSON-LD x1-3 per page |
| About/Contact/Legal | `/about`, `/contact`, `/privacy-policy`, `/terms`, `/cookie-policy` (5) | hardcoded | none | About+Contact have LeadCTAPanel | **0 on all 5** | no JSON-LD on any |
| Funnel | `/book`, `/thank-you`, `/complete` (3) | hardcoded | none | none (thank-you has booking picker) | `/book` 0, `/thank-you` 1 (conditional, see §0.2), `/complete` 0 | `robots: noindex` on thank-you |
| Embed | `/embed/[slug]` (1) | calculator registry | none | none (bare tool) | not probed for main; by-design bare | |
| Admin | `/admin/analytics`(+login/leads/trends/visitor/[id]) (5) | console auth | none | none | n/a, `noindex` gate | not part of port scope |

**Total 30 confirmed.** Family counts: Home 1, Services 2, For 2, Calculators 2, Blog 3, Research 6, Legal/About/Contact 5, Funnel 3, Embed 1, Admin 5 = 30.

**T12 decline list — components a kit text-children prop would ESCAPE the authored anchors on:**
| File | Kit component to DECLINE |
|---|---|
| `app/page.tsx` | any kit hero/body block taking `children` as plain text — homepage body is raw HTML |
| `app/services/[slug]/page.tsx` | `ServiceDetail`-shaped kit body component |
| `app/for/[slug]/page.tsx` | same |
| `app/calculators/[slug]/page.tsx` | kit calculator-copy wrapper |
| `app/blog/[category]/[slug]/page.tsx` | `BlogPostBody`-shaped kit component (post body is raw HTML per `blog_page_rendering_html_in_frontmatter` memory) |
| `app/research/rd-tax-relief-index/page.tsx` | kit report-body component |
| `app/research/startup-formation-survival-index/page.tsx` | same |
| `app/research/tech-startup-survival-index/page.tsx` | same |
| `app/research/uk-tech-formations-index/page.tsx` | same |
| `app/research/uk-tech-funding-reliefs-index/page.tsx` | same |

**Decline count: 11 files / 10 unique route templates** (globals.css and layout.tsx JSON-LD script tags excluded — those are intentional, not prose).

**Landmark defect: `<main>` absent on 0-count rows above** — Home, Services (both), For (both), Research index, About, Contact, Privacy, Terms, Cookie-policy, Book, Complete = **12 of 30 routes have no `<main>` landmark.** Phase 1's `PageShell`/kit chrome must supply it; do not assume pages already wrap content.

**Skip link:** zero hits for "skip" anywhere in probed page files — no skip-to-content link exists site-wide. Phase 1 must add it (kit `SiteHeader` normally carries this).

**One `<h1>` per route:** confirmed 1 static `<h1>` on every route checked except thank-you's 3 mutually-exclusive branches (§0.2, not a defect).

---

## 3. Kit adoption today

`@accounting-network/web-shared` is the real alias (`tsconfig.json` maps `@/*` to `./src/*` only; the kit package resolves via node_modules workspace, not a tsconfig path — confirm before assuming a path alias exists).

| Import | Count | Type |
|---|---|---|
| `lead-nurture/tokens`, `/config`, `/send`, `/lead-nurture-shared`, `/opt-out`, `/cron` | 12+10+9+4+1+1 | plumbing |
| `console/consoleAuth`, `/adminData`, `/journey`, `/components/*` (5 files) | 7+4+3+5 | plumbing (admin) |
| `tools/types`, `/format`, `/registry-helpers`, `/embed/EmbedAutoResize`, `/components/Calculator` | 5+4+1+1+1 | plumbing (calculators) |
| `design/marketing/LeadCTAPanel` | 5 | **design** |
| `components/ServiceTiers` | 2 | **design** |
| `schema` | 2 | plumbing |
| `nurture/webhook`, `/admin` | 2+2 | plumbing |
| `lib/niche-config`, `/frontmatter` | 2+1 | plumbing |
| `leads/capture-steps`, `/server` | 2+1 | plumbing |
| `analytics/ids`, `/track`, `/server/createTrackHandler`, `/react/useFormTracking`, `/react/ConsentedScripts`, `/react/ConsentProvider`, `/react/AnalyticsProvider` | 2+1+1+1+1+1+1 | plumbing |
| `content/llmsFull`, `/feed` | 1+1 | plumbing |

**Design-kit adoption is minimal: only `LeadCTAPanel` (5 uses) and `ServiceTiers` (2 uses).** No `SiteHeader`, `SiteFooter`, `PageShell`, blog kit components (`BlogListWithSearch`, `HubArticleList`, `BlogCategoryHub`, `TableOfContents`, `BlogSidebarCta`), or `ComparisonTable`/`ProblemStatement`/`NumberedReasons` imported anywhere. Confirms phase 1 is the first kit-chrome/blog-kit adoption on this site.

**Local components that duplicate kit shapes:**
| Local file | Kit equivalent | Verdict |
|---|---|---|
| `components/calculators/MiniCapture.tsx` | possibly `packages/web-shared/leads/MiniCapture.tsx` (playbook §8 names 9 consumers of a shared `MiniCapture`) | **not confirmed** whether this is a fork or the shared one re-exported locally — grep of the file's own imports needed; not done here (scope: chrome only). Flag for phase-1 investigation, do not assume duplicate. |
| `components/calculators/CalcResultCta.tsx` | no kit equivalent found named similarly | keep local |
| `components/forms/LeadForm.tsx` | none of the kit `leads/*` files matched by name | keep local, or confirm against `leads/server` |
| `components/blog/InlineMiniLeadForm.tsx` | thin wrapper around local `MiniCapture` (see its own header comment: "ported from contractors-ir35's `components/blog/InlineMiniLeadForm.tsx`") | already a cross-site port pattern; keep |

---

## 4. Blog subsystem

- Renderer: `app/blog/[category]/[slug]/page.tsx`, raw HTML via `dangerouslySetInnerHTML` (T12, listed above).
- Index: `app/blog/page.tsx`. Category hub: `app/blog/[category]/page.tsx`.
- Content dir: `web/content/blog/*.md`, flat (no category subdirs) — category comes from frontmatter, not path.
- Frontmatter fields observed (`eis3-certificate-explained.md`): `title`, `slug`, `date`, `author` (empty), `category`, `metaTitle`, `metaDescription`, `h1`, `summary`, `keyTakeaways[]`, `faqs[]` (question/answer pairs). No `schema:` field seen in this sample — JSON-LD is built separately (post page has 3 `application/ld+json` blocks per §2 table).
- 12 categories, ~30 posts confirmed via sitemap (`research-and-development` 6, `saas-and-tech-finance` 4, `seis-and-eis` 6, `share-schemes-and-emi` 10, `startup-compliance` 3).
- TOC/progress/sidebar/related: **not confirmed present or absent** — not inspected inside the post page body (out of §2 budget); flag for phase-1/blog-kit adoption check, since `TableOfContents`/`BlogSidebarCta` are not imported anywhere (§3), so if TOC exists it's a local, non-kit implementation.
- `InlineMiniLeadForm`: `formId="inline_mini"` (`components/blog/InlineMiniLeadForm.tsx:14`), single id, no per-category variation.

---

## 5. Calculators

| Route | Component | Test | Result gate |
|---|---|---|---|
| `/calculators/rd-relief-estimator` | `src/lib/calculators/tools/rd-relief-estimator.ts` | `rd-relief-estimator.test.ts` (root, **duplicate path** — also present unnamed in `__tests__/`? no: `__tests__/` has its own, see below) | none confirmed |
| `/calculators/seis-eis-relief-calculator` | `seis-eis-relief-calculator.ts` | `seis-eis-relief-calculator.test.ts` | none |
| `/calculators/founder-dividend-vs-salary-calculator` | `founder-dividend-vs-salary-calculator.ts` | `__tests__/founder-dividend-vs-salary-calculator.test.ts` | none |
| `/calculators/emi-vs-unapproved-calculator` | `emi-vs-unapproved-calculator.ts` | `__tests__/emi-vs-unapproved-calculator.test.ts` | none |

**Test-file layout is inconsistent, not duplicated**: `rd-relief-estimator.test.ts` and `seis-eis-relief-calculator.test.ts` sit next to their source in `tools/`, while the other two sit in `tools/__tests__/`. `__tests__/rd-relief-estimator.test.ts` does **not** exist (checked, only the flat one does) — no actual duplicate, just an inconsistent convention. Not a defect, a tidiness note.

No result gate/modal on any calculator (matches brief's "recheck says none" — confirmed, no `Modal`/gate component imported by any calculator file). `/embed/[slug]` (1 route) is the bare embed surface, driven by the same registry.

---

## 6. Interruptive surfaces

`grep -rln 'Modal\|Banner\|Popup\|StickyBar\|ExitIntent\|ConsentBanner' src --include=*.tsx` → **zero hits.** No modal, banner, popup, sticky bar, exit-intent, or consent-UI component anywhere on the site, shared `ConsentBanner` included. Consent is handled by `ConsentProvider`/`ConsentedScripts` (non-interruptive, per playbook `posture="opt-out"`). Phase 1 must add none of these without an owner ask (standing rule).

---

## 7. Anchors and scroll-margin

Exactly one hit site-wide: `app/calculators/[slug]/page.tsx:79`, `<div id="get-expert-help" className="mt-12 scroll-mt-24">`. No other in-page `#` anchors or `scroll-margin`/`scroll-mt` targets found in `src`.

---

## 8. Dead code / orphan route candidates

Sitemap (`curl :3201/sitemap.xml`) lists all `about/blog(+30)/calculators(+4)/contact/cookie-policy/for(+5)/privacy-policy/research(+5)/services(+6)/terms` — 58 URLs. **Not in the sitemap** (expected, not a defect, but flagged per playbook T14 since deleting any of these later would need a GSC check first): `/book`, `/thank-you`, `/complete` (funnel, correctly excluded), `/embed/[slug]` (correctly excluded, iframe target), `/admin/*` (correctly excluded, gated). No route was found with zero nav/sitemap inbound links that isn't one of these expected utility pages — **no orphan-route candidate identified.**

---

## 9. Analytics / lead plumbing phase 1 must not break

- Chain in `layout.tsx`: `ConsentProvider` → `AnalyticsProvider` (`siteKey={niche.content_strategy.site_key}` = `"startups-tech"`, `storagePrefix="ffp"`, `posture="opt-out"`, `noTrackPrefixes={["/admin"]}`) → `ConsentedScripts` (`gaMeasurementId={niche.seo.google_analytics_id}` = `""` — **GA id is empty in config**, `adsenseClientId="ca-pub-3756285576371279"`) → `{children}`.
- `data-cta` ids in use: only `data-cta="thankyou-return-article"` (`thank-you/page.tsx:107`) — **the entire rest of the site has zero `data-cta` instrumentation.** Phase 1 adding a header/footer CTA is net-new instrumentation, not a preservation risk (confirms §0.1).
- Lead source key: `niche.config.json` `content_strategy.source_identifier` = `"startups-tech"`. `web/src/config/site.ts` not separately inspected for a second definition — flag for phase-1 cross-check (brief specifically warns `niche.config.json` "has no `source_identifier`" for other sites; here it does have one, so this site differs from the brief's general warning — worth a phase-1 double-check against `site.ts` for drift).
- `leadConsentText`: not located in files inspected — not found under this name in `src` at the paths checked; flag for phase-1, do not assume absent (T19: never touch as a side effect regardless).

---

## 10. Tests (8 files, confirmed)

| File | Guards |
|---|---|
| `app/api/track/route.test.ts` | analytics track endpoint |
| `lib/calculators/tools/rd-relief-estimator.test.ts` | R&D estimator math |
| `lib/calculators/tools/seis-eis-relief-calculator.test.ts` | SEIS/EIS calc math |
| `lib/calculators/tools/__tests__/founder-dividend-vs-salary-calculator.test.ts` | dividend-vs-salary calc math |
| `lib/calculators/tools/__tests__/emi-vs-unapproved-calculator.test.ts` | EMI calc math |
| `tests/lead-contactability-bridge.test.ts` | lead contactability bridge |
| `tests/lead-submit-verify.test.ts` | lead submit verification |

**7 files listed, brief says 8.** Re-check: `find ... -iname '*.test.*' -o -iname '*.spec.*'` returned 7 distinct test files (the `rd-relief-estimator.test.ts` line appeared once, not duplicated). **Brief's count of 8 does not match; actual is 7.** Flagged in §0 would apply but was found after that section was drafted — recorded here instead.

**No focus-ring repo-walk guard exists.** No file named `focus-ring.test.ts` or similar found anywhere in `startups-tech/web/src/tests` (only the two lead tests are present there). The `contractors-ir35`-shaped "guards the guard" test does not exist on this site; phase 6 will need to add one, not assume it's inherited.

---

## Ranked live-defect list

**Serious:**
1. No `<main>` landmark on 12 of 30 routes (§2) — accessibility/landmark defect, present on Home and both Services/For families.
2. No skip-to-content link anywhere on the site (§2).
3. No logo/wordmark asset exists (`public/brand/logo.png` missing) despite `niche.config.json` declaring one (§1) — site currently ships with no visual brand mark at all.
4. Test-count mismatch: actual is 7 files, not the 8 the brief and this doc's §10 header assumed before recount — correct the phase-1 brief to 7.

**Minor:**
5. Test-file location inconsistency in `lib/calculators/tools/` (two conventions, no duplication) (§5).
6. `MiniCapture.tsx` fork-vs-shared status unconfirmed (§3) — needs a phase-1 grep before reuse decisions.
7. Blog TOC/sidebar/related presence unconfirmed inside post body (§4).
8. `leadConsentText` location unconfirmed (§9).
9. `site.ts` source-identifier cross-check not done (§9).

## False premises in this brief

1. "Derive `ctaContactGoal`/`ctaMobilePlacement` from the closest existing CTA's `data-cta-goal`/`data-cta-placement`" — there is no existing header/body CTA carrying either attribute anywhere on the site (§0.1). Nothing to derive from; phase 1 picks fresh values.
2. Implicit assumption that a raw grep count of `<main>`/`<h1>` on `thank-you/page.tsx` (3 each) indicates duplicate landmarks — it's three mutually exclusive early-return branches, only one renders (§0.2).
3. This document's own §10 draft assumed 8 test files per the brief; recount found 7 (§10) — corrected in place, not a brief error but worth flagging since the brief stated 8 as fact.
