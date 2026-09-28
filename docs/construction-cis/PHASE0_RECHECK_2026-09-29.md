# construction-cis phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation; ran `--no-control` since the
gov.uk control passed earlier in this session). Nothing deployed.

## Verdict
SAFE AFTER FIXES LISTED (mechanical side only): a real og:image 404 and a live result gate on
blog-embedded calculators.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 61 at 1280, 61 at 390 | harness summary.md |
| lead form on every money page | 59/61 PASS (0 forms on hub pages `/for` and `/calculators`, and on `/blog/cis-basics` the blog index) | summary.md — see Findings #3 |
| one form under each calculator result, no gate | 15/15 standalone `/calculators/*` routes render 2-3 forms and are not gated (`placement` != "blog" there); blog-embedded premium calculators ARE gated for first-time visitors — see Findings #1 (HIGH) | `PremiumCalculator.tsx:504` `const gated = placement === "blog" && !isConverted();`; `BlogPostRenderer.tsx:274,281,294,300` passes `placement="blog"` |
| header CTA visible 1280 / hidden 390 | 61/61, 61/61 | summary.md |
| scrollWidth 390 on every page | 61/61 PASS | summary.md |
| raw markup as text | 0 pages | summary.md |
| focus ring on first form control | 61/61 PASS (`noform` on the 3 hub/index pages with no form) | summary.md |
| submit / primary CTA contrast >= 4.5 | 61/61, flat 5.18 | summary.md |
| canonical self-referencing | 61/61 PASS (43 canonical declarations in app/) | summary.md |
| sitemap lastModified real or omitted | PASS, 5 distinct dates, 0 dated "today"; `lastModified` omitted where no real date tracked (`sitemap.ts:18-19` comment, posts use `updatedDate \|\| date`, category pages use `newest()`) | harness: `locs=246 lastmod=90 distinct=5 today=0` |
| Organization node with parentOrganization | 61/61 PASS AccountingService | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | 45/45 `/for/*` = 1/1/1; `/services` = 8/0/1 | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=75/76; llms-full 200; ads.txt 200 pub=true; **og:image 404 on every page sampled** | harness header line + Findings #2 |
| lead-nurture delayHours | `0,0,4,20,24,48,72,96,0,24,48,168` | wording_grep.txt; matches expected first eight exactly |
| defect-string count base vs HEAD | 65 vs 65, identical per-file (31 files) | wording_grep.txt |
| phase-0 replacement strings at HEAD | 1 (`niche.config.json:12`, `entity.next`; confirmed NOT rendered anywhere in `web/src`, config only) | wording_grep.txt + `grep -rn "entity.next" web/src` returns nothing |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report already ran clean: tsc 0 errors, 443/443 tests) | docs/construction-cis/PHASE0_2026-09-28.md line 247 |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **HIGH — blog-embedded calculator result IS still gated for first-time visitors.**
   `components/calculators/premium/PremiumCalculator.tsx:504`:
   `const gated = placement === "blog" && !isConverted();`. `components/blog/BlogPostRenderer.tsx:274,281,294,300`
   mounts `PremiumUpgrade` with `placement="blog"` on four blog-post insertion points, and
   `PremiumUpgrade` renders `PremiumCalculator`. For any visitor who has not already converted,
   the result is held behind `ResultGateModal` (still imported and wired at line 681). Unlike
   Dentists (`gated = false`, permanently, confirmed dead code) and Medical (gate component
   deleted), construction-cis's builder report does not mention touching this gate at all — it
   says lead kit "not re-audited from scratch" and relies on the research's earlier finding that
   standalone `/calculators/*` pages were already ungated. That earlier finding did not cover the
   blog-embedded placement. This contradicts brief section 4 ("no gate, no modal ... Remove
   ResultGate/ResultGateModal usage where it still gates"). Not caught by the harness's page-level
   sampling because the sampled blog post (`/blog/cis-basics`) does not itself embed a premium
   calculator — cannot rule out other posts also embedding one and gating live.
2. **HIGH — og:image returns 404 on every sampled page.** `curl -I http://localhost:3413/`
   (and every other route in the harness table) sets `og:image` to
   `https://www.tradetaxspecialists.co.uk/brand/icon-alt.png`, and
   `curl -o /dev/null -w "%{http_code}" http://localhost:3413/brand/icon-alt.png` returns **404**
   (file does not exist under `construction-cis/web/public/brand/`). This is the exact defect the
   brief section 5 calls out for wills-probate and divorce-finances ("point at
   `/brand/icon-alt.png`; point at an asset that exists in `public/`") but it is not fixed here and
   not mentioned in the PHASE0 report at all.
3. **LOW — three hub/index pages render no form.** `/for` (the `/for/*` index), `/calculators`
   (the calculator index) and `/blog/cis-basics` (a blog category index) show `forms=0` /
   `noform` in the harness. These are navigation hubs, not the money pages the brief names
   (home/about/services/`/for/*`/`/services/*`/every blog post/contact), so likely not a defect,
   but flagging since the brief's page list does not explicitly exempt index/hub routes.

## Wording (Opus reader B, 2026-09-29)

Deterministic walk of `git diff 8e1043d0 HEAD -- construction-cis/web/src construction-cis/niche.config.json` (14 files, 176+/59-). Rendered read of 8 routes against `next start -p 3513`.

| file | class |
|---|---|
| `niche.config.json` `entity` block | CONFIG-NOT-RENDERED except `entity.firm`, read only by `web/src/lib/schema.ts:50` for Organization JSON-LD. `entity.next` is not rendered anywhere (`grep -rn "niche.entity" construction-cis/web/src` = 2 hits, both schema.ts) |
| `niche.config.json` new `blog` block (`cta_heading`, `cta_body`, `cta_button`) | CONFIG-NOT-RENDERED. Sole reader is `web/src/lib/niche-config.test.ts:49-58`, a test that existed at base and expected the key. No `.tsx` reads `getActiveCta(niche).blog`, and `lib/blog-cta-map.ts` is unchanged base..HEAD (7 defect-string hits both sides), so the fixed blog block still renders. Flagged, not a wording defect |
| `app/for/[slug]/page.tsx` | MECHANICAL (Service + BreadcrumbList JSON-LD only, no prose touched) |
| `app/layout.tsx`, `public/ads.txt`, `next.config.ts`, `pipeline/submit_indexnow.py` | MECHANICAL (AdSense, IndexNow) |
| `app/sitemap.ts` | MECHANICAL (build-time `new Date()` dropped across 130 URLs) |
| `app/globals.css` | MECHANICAL (`.prose-blog table` becomes its own scroll container) |
| `components/layout/SiteFooter.tsx` | MECHANICAL (`/book` to `/contact#book`; anchor verified, `app/contact/page.tsx:78` carries `id="book"`) |
| `components/blog/BlogListWithSearch.tsx`, `forms/DetailsForm.tsx`, `forms/LeadForm.tsx` | MECHANICAL (focus-visible rings only) |
| `config/lead-nurture.ts` | MECHANICAL (`delayHours` to 0,0,4,20,24,48,72,96; comment corrected to say GAP) |
| `lib/schema.ts` | MECHANICAL (shared `buildOrganization`, AccountingService, sameAs, parentOrganization) |

### Surviving agent sentences
Zero. Every prose file the revert doc names for this site is byte-identical to base, proved by an empty diff:
- `git diff --stat 8e1043d0 HEAD -- construction-cis/web/src/app/contact/page.tsx .../complete/page.tsx .../book/page.tsx` returns nothing, so the `WhatToExpectCard` mounts and the complete page are restored.
- Same empty diff for `app/privacy-policy/page.tsx`, so section 5's pool-model text is back at base.
- "Ask a specialist" is back and "Ask we" does not exist: `components/support/SpecialistWidget.tsx:457` and `:575` read "Ask a specialist"; `grep -rn "Ask we" construction-cis/` returns nothing.
- Defect-string counts match base file by file across all 29 files.

### Rendered read (`/`, `/about`, `/services`, `/for/plumbers`, `/for/electricians`, `/contact`, `/complete`, `/cis-refund`)
- Zero hits for any of the four phase 0 sentences.
- The pool-model sentences render as base intended, for example `/contact`: "Your enquiry goes to regulated firms in our specialist partner network, so a specialist can answer it."; `/complete`: "Add the last detail we need and a specialist from our partner network will be in touch to arrange your free CIS review, no obligation."; `WhatToExpectCard`: "A regulated firm from our specialist partner network makes it". These are the base text the owner asked for, correctly back, not defects.
- `/for/plumbers` reads in the site's voice and stays trade-specific, e.g. "Many main contractors apply the 20% rate to the full invoice value rather than splitting out materials. If yours do, you are overpaying on every job." No slug pasted into English on either `/for/*` page sampled.
- Nothing read as machine-written.

### Mechanical regression
None. Focus rings present on the three form components; `delayHours` correct; table overflow fix in place; footer reaches a form via `/contact#book`.

## What the PHASE0 report claimed that this recheck could not confirm
- The report's "Opus read and fixes" section lists five categories of fixes but never addresses
  the blog-embed gate path (Finding #1); this recheck could not confirm the gate was ever
  considered for this site, only that it was not removed.
- og:image was not measured by either the builder or the Opus reader pass for this site (their
  measured-metrics table has no og:image column at all), so this recheck could not confirm whether
  it broke during phase 0 or predates it; either way it is live-broken now (Finding #2).

## Method notes
- Port 3413, `construction-cis/web`, server started and killed cleanly (PID 61956, confirmed port
  free after `taskkill`).
- Harness runtime: approx 5 minutes (61 pages, both widths, screenshots), `--no-control`.
- Pages sampled: 61 (home, about, services, contact, `/for` hub, `/calculators` hub, 45 `/for/*`
  segment pages, 12 calculator routes, 1 blog post).
- Extra manual checks: `/book` renders 0 `<form>`, but the footer link now points at
  `/contact#book` (`SiteFooter.tsx:37`, `/contact#book` -> "Book a consultation"), and `/contact`
  itself renders 1 form (confirmed live and in the harness table) — footer target is correct.
  `layout.tsx` carries `google-adsense-account` (line 47) and `ConsentedScripts adsenseClientId`
  (line 101); `web/public/ads.txt` exists; `pipeline/submit_indexnow.py` has
  `SITE_KEY = "construction-cis"` (line 16).
- Screenshots not individually opened this pass given the two concrete numeric/grep findings
  already found (gate, og:image); time spent confirming those instead.

## Estate summariser note (2026-09-29)
Final status: NOT SAFE TO DEPLOY.
Blocking item: the blog-embedded calculator result is still gated for first-time visitors (H4) and og:image 404s on every page (H5).

## Fix round (2026-09-29)

Scope: `construction-cis/web/src/` and `construction-cis/web/public/` only. No deploy.

1. **H4 (blog calculator gate) fixed.**
   - `construction-cis/web/src/components/calculators/premium/PremiumCalculator.tsx`: deleted the
     gate branch entirely rather than adding a flag. Removed `const gated = placement === "blog" && !isConverted()`,
     the `revealed`/`gateOpen` state, the `gateModalShownThisSession` module flag, `onSeeResult`,
     `revealFromGate`, the `showResult ? … : "See your result"` pre-reveal branch, and the
     `<ResultGateModal>` mount. The result panel (`HeadlineCard` / `ScenarioTiles` / chart /
     `Workings`) now always renders. Removed now-unused imports: `ResultGateModal`, `isConverted`,
     `useCallback`, `btnPrimary`.
   - The blog-placement lead CTA condition simplified from `placement === "blog" && !gated && !revealed`
     to `placement === "blog"`, so `<CalcResultCta>` sits directly under the result for every
     blog-embedded calculator, matching the standalone `/calculators/*` shape (which was already
     ungated).
   - `construction-cis/web/src/components/blog/BlogPostRenderer.tsx:274,281,294,300`: unchanged
     (`placement="blog"` mounts were already correct; the gate lived inside `PremiumCalculator`,
     not here).
   - `construction-cis/web/src/components/calculators/premium/PremiumUpgrade.tsx:22-24`: corrected
     a stale doc comment that referenced the now-removed `ResultGateModal` threading (mechanical,
     not new prose).
   - `ResultGateModal.tsx` left in place, unreferenced, per instructions.
   - Grep proof (only comment mentions remain, no active wiring):
     ```
     construction-cis/web/src/components/calculators/premium/PremiumUpgrade.tsx:23: * ResultGateModal. It is NEVER re-derived from the URL inside the gate.
     construction-cis/web/src/components/calculators/premium/ResultGateModal.tsx:6: * Ported from Dentists/web/src/components/tools/premium/ResultGateModal.tsx.
     construction-cis/web/src/components/calculators/premium/ResultGateModal.tsx:15: *   2. isConverted() visitors are NEVER gated (checked by PremiumCalculator).
     construction-cis/web/src/components/calculators/premium/ResultGateModal.tsx:33:export function ResultGateModal({
     ```
     (Note: `PremiumUpgrade.tsx:23` comment quoted above is pre-edit; the file now reads
     "The result gate / ResultGateModal path was removed; results render immediately for every
     placement.")

2. **H5 (og:image 404) fixed.**
   - `construction-cis/web/public/brand/` does not exist at all, so neither `publisher_logo_url`
     (`/brand/icon-alt.png`) nor `logo_path` (`/brand/primary-logo.png`) in `niche.config.json`
     resolve to a real file. `niche.config.json` is outside the editable scope for this fix
     (only `web/src` / `web/public`), so the fix was made where the value is consumed:
     `construction-cis/web/src/config/site.ts:29` — `publisherLogoUrl` no longer reads
     `niche.brand.publisher_logo_url`; it is hardcoded to `"/icon.svg"`, the only image asset that
     actually exists (`construction-cis/web/src/app/icon.svg`, Next.js app-router route icon,
     served at `/icon.svg`). This is an SVG, not a PNG/JPG; acceptable per brief, noted here.
   - Before: `og:image` = `https://www.tradetaxspecialists.co.uk/brand/icon-alt.png` (404).
   - After: `og:image` = `https://www.tradetaxspecialists.co.uk/icon.svg` (verified to exist:
     `construction-cis/web/src/app/icon.svg`, 426 bytes).
   - This also fixes the JSON-LD `Organization.logo` (`lib/schema.ts:53` reads the same
     `siteConfig.publisherLogoUrl`), which pointed at the same missing file.

## Verification
- `npx tsc --noEmit -p construction-cis/web` → no output, 0 errors.
- `cd construction-cis/web && npx vitest run` → 30 files, 443/443 tests passed.
  One test needed updating: `src/tests/design/cta-attribute-diff.test.ts` pinned a
  `data-cta="see_result"` entry for the now-deleted gate button
  (`src/components/calculators/premium/PremiumCalculator.tsx|see_result|null|null`); removed
  from the `PINNED` list, expectation now matches the degated component.
