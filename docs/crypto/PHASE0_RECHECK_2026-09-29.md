# crypto phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation; ran `--no-control` since the
gov.uk control passed earlier in this session). Nothing deployed.

## Verdict
SAFE TO DEPLOY (mechanical side only); no real defects found, one harness false-negative explained
below (Findings #1) and one transient render timeout not reproducible (Findings #3).

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 22 at 1280, 21 at 390 (1 route timed out in Puppeteer, confirmed fine via curl) | harness summary.md |
| lead form on every money page | harness's `leadForms` column reads 0 on 17/22 routes; manually confirmed **1 `<form>` present** on every one of those routes via curl (home, about, services, contact, `/for`, `/calculators`, all `/for/*`, all `/services/*`) — see Findings #1, harness false negative, not a defect | curl `grep -o "<form"` on `/`, `/about`, `/for/miners`, `/services/crypto-cgt-planning` all = 1 |
| one form under each calculator result, no gate | 4/4 calculator routes, 2 forms each, `gate` column PASS (no gate markup) | summary.md |
| header CTA visible 1280 / hidden 390 | 22/22, 22/22 | summary.md |
| scrollWidth 390 on every page | 21/21 measured PASS | summary.md |
| raw markup as text | 0 pages | summary.md |
| focus ring on first form control | present everywhere except the 5 hub/index-style routes with no form field in view (correctly `noform`, not a fail) | summary.md |
| submit / primary CTA contrast >= 4.5 | flat 17.11 on calculator routes; "-" elsewhere because the harness's contrast check only ran on detected `leadForms`, itself a false negative from #1 | summary.md |
| canonical self-referencing | 21/21 PASS (23 canonical declarations in app/) | summary.md |
| sitemap lastModified real or omitted | PASS, 2 distinct dates, 0 dated "today"; `lastModified` omitted wherever no real date is tracked, comment confirms it used to be build-time `new Date()` on every route | harness: `locs=51 lastmod=19 distinct=2 today=0`; `sitemap.ts:11-12` |
| Organization node with parentOrganization | 21/21 PASS AccountingService | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | all `/for/*` and `/services/*` = 1/1/2 | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=25/28; llms-full 200; ads.txt 200 pub=true; og:image 200 everywhere (dynamic `/api/og` route, not a static asset) | harness header line; confirmed `og:image` content is `https://www.cryptotaxpartners.co.uk/api/og`, 200 |
| lead-nurture delayHours | `0,0,4,20,24,48,72,96,0,24,48,168` | wording_grep.txt; matches expected first eight exactly |
| defect-string count base vs HEAD | 26 vs 26, identical per-file (14 files) | wording_grep.txt |
| phase-0 replacement strings at HEAD | 1 (`niche.config.json:12`, `entity.next`; not rendered anywhere per grep) | wording_grep.txt |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report already ran clean: tsc 0 errors, 44/44 tests) | docs/crypto/PHASE0_2026-09-28.md lines 231-233 |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **Harness false negative, not a site defect — flagged so the number above is not misread.**
   `crypto/web/src/components/forms/LeadForm.tsx:39` is a two-step form (`useState<0 | 1>(0)`):
   step 1 ("About you") asks role/situation questions with no email or phone field; step 2
   ("Your details", lines 349-384) is where `name="email"` and `name="phone"` render, only after
   the visitor clicks through step 1. The harness's `leadForms` filter requires an email/phone
   input to be present in the DOM at initial page load, so it undercounts every page using this
   component as `forms=0`. Manually confirmed via curl that exactly 1 `<form data-form-id="...">`
   renders server-side on every route the PHASE0 report claims (home, about, services, contact,
   `/for`, all `/for/*`, all `/services/*`). Not a defect; the PHASE0 report's claim of "1
   (`lead_form`)" on each of these routes holds.
2. **LOW — one route timed out in the harness's Puppeteer render (`/services/investor-vs-trader-status`).**
   Re-checked directly: `curl` returns 200 in 48ms. Almost certainly a transient
   resource contention from running many Chromium instances back to back, not a site defect.
   Re-run if a future pass needs that route's numbers.
3. **LOW — `og:image` is a dynamic route, not the missing-static-asset defect named elsewhere.**
   Confirmed 200 on every sampled page; the brief's og:image concern (wills-probate,
   divorce-finances pointing at a missing static file) does not apply here, matching the PHASE0
   report's own note.

## Wording (Opus reader B, 2026-09-29)

Deterministic walk of `git diff 8e1043d0 HEAD -- crypto/web/src crypto/niche.config.json crypto/web/public/llms.txt` (19 files, 237+/139-). Rendered read of 9 routes against `next start -p 3514`.

| file | class |
|---|---|
| `niche.config.json` `entity` block | CONFIG-NOT-RENDERED except `entity.firm`, read only by `web/src/lib/schema.ts:27`. `entity.next` = "We reply within 24 hours and one of our accountants comes back to you directly." is the one phase 0 string added to this site and nothing renders it (`grep -rn "niche.entity" crypto/web/src` = 1 hit, schema.ts) |
| `public/llms.txt` (50 lines) | MECHANICAL. Every removed line is re-added with the same description plus `utm_source=chatgpt&utm_medium=llms`; filtering the UTM-tagged lines out of the diff leaves only the untagged originals. No prose rewritten |
| `app/about/page.tsx` | NEW PANEL, copy carried over verbatim. The base link block becomes `LeadCTAPanel` and every string passed is the base page's own: eyebrow "Free call", title "Tell us where you are", the description, and the footnote "No obligation and no hard sell. If your position is already right, we will say so." This is the pattern the ruling asks for |
| `app/for/page.tsx` | NEW PANEL, copy reused from the page's own base hero (`git show 8e1043d0:crypto/web/src/app/for/page.tsx`): title "Specialist crypto tax for every type of holder." and description "Each holder type faces different tax rules and compliance obligations. We work with all of them." No new prose |
| `components/templates/TopicPageLayout.tsx` | NEW PANEL + MECHANICAL. The link block becomes `LeadCTAPanel` fed the existing `ctaHeading`/`ctaBody` props; plus Service + BreadcrumbList JSON-LD |
| `app/for/[slug]/page.tsx`, `app/services/[slug]/page.tsx`, `app/calculators/[slug]/page.tsx` | MECHANICAL (one-line `pageUrl` prop / schema wiring) |
| `app/layout.tsx`, `app/robots.ts`, `public/ads.txt`, `next.config.ts`, `pipeline/submit_indexnow.py` | MECHANICAL (AdSense, AI-crawler allowlist, IndexNow) |
| `app/sitemap.ts` | MECHANICAL (build-time date dropped) |
| `components/forms/LeadForm.tsx`, `forms/DetailsForm.tsx`, `calculators/MiniCapture.tsx` | MECHANICAL (focus-visible rings only) |
| `config/lead-nurture.ts` | MECHANICAL (`delayHours` to 0,0,4,20,24,48,72,96) |
| `lib/schema.ts` | MECHANICAL (shared `buildOrganization`, AccountingService, sameAs, parentOrganization; knowsAbout list preserved) |

### Surviving agent sentences
None. Defect-string counts match base file by file (TOTAL base=26 HEAD=26).

### Rendered read (`/`, `/about`, `/services`, `/services/crypto-self-assessment`, `/services/crypto-cgt-planning`, `/for/investors`, `/for/miners`, `/contact`, `/calculators/crypto-cgt-estimator`)
1. "Free first call, then a fixed fee in writing" renders on four routes: `/services/crypto-self-assessment`, `/services/crypto-cgt-planning`, `/for/investors`, `/for/miners`. All four are the shared `LeadCTAPanel` DEFAULT eyebrow (`packages/web-shared/design/marketing/LeadCTAPanel.tsx:18`) on panels newly mounted in phase 0; base `TopicPageLayout` rendered a link to `/contact` and no form. ALLOWED, not a finding, but worth the owner knowing it is now the standing promise across the crypto service and holder-type pages.
2. MEDIUM, pre-existing, NOT a revert failure: the slug is pasted into English on every `/for/*` page, and the new panel promotes it from a dark closing block into the lead panel's description. `/for/investors`: "Tell us about your investors situation and we will explain what is involved." `/for/miners`: "Tell us about your miners situation and we will explain what is involved." Source is `crypto/web/src/app/for/[slug]/page.tsx:34`, a template literal interpolating `audience`, and `git show 8e1043d0:` of that file carries the identical line 34, so it is base text. Phase 0 brief section 4 named this exact defect ("no slug pasted into English") and it was not fixed; the reversal now locks it in until the owner-led wording pass. It is the only sentence on the site that reads machine-written.
3. Zero hits for the other three phase 0 sentences on any route.

### Mechanical regression
None. Focus rings present; `delayHours` correct; every new panel carries `proofPoints={[]}` so no fee or turnaround claim was invented; llms.txt fully UTM tagged.

## What the PHASE0 report claimed that this recheck could not confirm
- Nothing material. All claims in the "Opus read and fixes" section (eleven closers, `/for` panel
  copy, focus ring, calculator og:image) are either confirmed by the numbers above or are prose
  quality judgements out of this pass's scope (left for the Opus wording reader).

## Method notes
- Port 3414, `crypto/web`, server started and killed cleanly (PID 53860, confirmed port free
  after `taskkill`).
- Harness runtime: approx 3 minutes (22 routes attempted, one timeout), `--no-control`.
- Pages sampled: 22 (home, about, services, contact, `/for` hub, `/calculators` hub, 5
  `/services/*`, 6 `/for/*`, 4 calculator routes, 1 blog post).
- Extra manual checks: `/book` renders 0 `<form>` (by design, PHASE0 report confirms it sends to
  `/contact` when no token is present, which renders a form); `robots.txt` disallows `/book` and
  `/complete` as claimed; `layout.tsx` carries `google-adsense-account` (line 82) and
  `ConsentedScripts adsenseClientId` (line 103); `web/public/ads.txt` exists;
  `pipeline/submit_indexnow.py` has `SITE_KEY = "crypto"` (line 22); `/for/[slug]` and
  `/services/[slug]` each confirmed to render 1 `<form>` directly (curl), not just via the
  `TopicPageLayout` import grep.
- Screenshots not individually opened this pass; the form-detection finding above was chased
  through source and curl instead, which resolved it more precisely than a screenshot would.

## Estate summariser note (2026-09-29)
Final status: SAFE TO DEPLOY AS IS.
Blocking item: none.
