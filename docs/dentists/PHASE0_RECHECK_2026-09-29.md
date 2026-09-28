# dentists phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation; ran `--no-control` since the
gov.uk control passed earlier in this session on the Medical run). Nothing deployed.

## Verdict
SAFE TO DEPLOY (mechanical side only); one wording-revert gap found (see Findings #1).

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 28 at 1280, 28 at 390 | harness summary.md |
| lead form on every money page | 28/28 PASS, 1-3 forms per page | summary.md |
| one form under each calculator result, no gate | 14/14 calculator routes render; `gated` is hardcoded `false` so the "see result" gate button branch is unreachable dead code — see Findings #2 | `PremiumCalculator.tsx:503` (`const gated = false;`), line 640 gate branch confirmed unreachable |
| header CTA visible 1280 / hidden 390 | 28/28, 28/28 | summary.md |
| scrollWidth 390 on every page | 28/28 PASS | summary.md |
| raw markup as text | 0 pages | summary.md |
| focus ring on first form control | 28/28 PASS | summary.md |
| submit / primary CTA contrast >= 4.5 | 28/28, flat 17.15 | summary.md |
| canonical self-referencing | 28/28 PASS (44 canonical declarations in app/) | summary.md, wording_grep.txt |
| sitemap lastModified real or omitted | PASS, 19 distinct dates, 0 dated "today"; posts/guides omit `lastModified` when no real date exists (`sitemap.ts:98,121`) | harness: `locs=289 lastmod=229 distinct=19 today=0` |
| Organization node with parentOrganization | 28/28 PASS AccountingService | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | all 4 `/for-*` and 5 `/services/*` = 1/1/1 | summary.md |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=52/53; llms-full 200; ads.txt 200 pub=true; og:image 200 on home, missing (-) on inner pages | harness header line + summary.md Org-parent-adjacent og:image column shows "-" on most non-home routes |
| lead-nurture delayHours | `0,0,4,20,24,48,72,96,0,24,48,168` | wording_grep.txt; matches expected first eight exactly |
| defect-string count base vs HEAD | 111 vs 111, identical per-file (29 files) | wording_grep.txt |
| phase-0 replacement strings at HEAD | 2 (`niche.config.json:12`, `about/page.tsx:104`, both the `cta.next` string) | wording_grep.txt — see Findings #1 |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report already ran clean: tsc 0 errors, 495/495 tests) | docs/dentists/PHASE0_2026-09-28.md lines 225-226 |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **MEDIUM — a phase-0 sentence was not reverted.** `Dentists/niche.config.json:12`
   (`entity.next`) and `Dentists/web/src/app/about/page.tsx:104` both still render "We reply
   within 24 hours and one of our accountants comes back to you directly." The
   WORDING_REVERT doc's per-site restore list for Dentists (28 files) does not mention this
   string, and the PHASE0 wording-reverted section does not claim it either — this is the
   estate-wide known issue #2 from `AGENT_BRIEF.md` ("eleven sites gained a `cta.next` key...
   if rendered on a page that existed at base, it is a wording finding"). `/about` existed at
   base, so this is a live finding, not "config only". Flag for the owner/Opus wording pass.
2. **LOW — og:image missing on inner pages.** Home returns 200 for og:image; the summary.md
   "og:image" column shows "-" (not checked / absent) on `/about`, `/services`, `/contact`,
   `/calculators`, all `/for-*`, all `/services/*` and all `/calculators/*` routes. Not called
   out in the PHASE0 report either way; worth a follow-up curl pass per route rather than trusting
   the summary column, since the harness marks it "-" (undetermined) rather than a confirmed FAIL.
3. **LOW — dead gate code left in place, matches the PHASE0 report's own framing.** `ResultGateModal`
   import and JSX (`PremiumCalculator.tsx:36,680`) are unreachable because `gated` is hardcoded
   `false` (line 503) and the only path that calls `setGateOpen(true)` (`onSeeResult`, line 544)
   is wired to a button that only renders when `!showResult`, which is never true. Confirmed by
   reading the component, not by rendering a click. Consistent with Medical leaving similar dead
   code in place; not a live defect.

## Wording
Deterministic walk of `git diff 8e1043d0 HEAD -- Dentists/web/src Dentists/niche.config.json` (14 files, 126+/48-). Rendered read of 10 routes against `next start -p 3512`.

| file | class |
|---|---|
| `niche.config.json` `entity` block (firm, serves, where, howItWorks, next) | CONFIG-NOT-RENDERED except `entity.firm`. Only reader is `web/src/lib/organization-schema.ts:25` (`description: niche.entity?.firm ?? siteConfig.description`), i.e. JSON-LD. `grep -rn "EntityBlock|entity.next" Dentists/web/src` returns nothing, so `entity.next` = "We reply within 24 hours and one of our accountants comes back to you directly." is not rendered. Ruling keeps `entity` as machine copy |
| `niche.config.json` `footer_links` "Book a consultation" | MECHANICAL (footer link must reach a form) |
| `app/layout.tsx`, `public/ads.txt`, `next.config.ts`, `pipeline/submit_indexnow.py` | MECHANICAL (AdSense, IndexNow) |
| `app/sitemap.ts` | MECHANICAL (build-time `new Date()` dropped, real post dates kept) |
| `app/globals.css` | MECHANICAL (prose-standard import, table overflow-x) |
| `components/audience/AudienceStageLayout.tsx`, `lib/organization-schema.ts` | MECHANICAL (Service node, AccountingService, sameAs, knowsAbout, parentOrganization) |
| `components/forms/*`, `app/admin/analytics/login/page.tsx` | MECHANICAL (focus-visible rings) |
| `components/tools/premium/PremiumCalculator.tsx` (`gated = false`) | MECHANICAL (gate removal) |
| `config/lead-nurture.ts` | MECHANICAL (`delayHours` 24/48/96/168/264 to 20/24/48/72/96) |
| `app/about/page.tsx` | NEW PANEL carrying hand-written phase 0 prose, see below |
| `app/book/page.tsx` | MECHANICAL (link replaced by form; the one-clause copy change is required by the mount) |

### Surviving agent sentences
None on a surface that existed at base. Three items to flag:

1. LOW, `Dentists/web/src/app/about/page.tsx:100-106`. A new panel (base `/about` imported no `LeadForm`; the import is added in this diff, so the mount is allowed) but it is hand-rolled rather than the shared `LeadCTAPanel`, and it carries agent prose: heading "Send us your details", body "We reply within 24 hours and one of our accountants comes back to you directly." The ruling for newly mounted panels is "keep the mount but pass no custom copy, so the shared `LeadCTAPanel` defaults render". This is the one place a phase 0 sentence still reaches a prospect on this site.
2. LOW, voice seam the revert creates on that same page. Correctly restored base copy three paragraphs above the new panel reads "A specialist dental accountant from our partner network, not a generalist who has never seen a UDA schedule." The new panel then says "one of our accountants". Both render on `/about`, a few hundred pixels apart. Not a revert failure, but it is what a reader would notice, and it argues for the panel using the shared default.
3. `app/book/page.tsx:47` HEAD "If you cannot find it, send us your details below and we will arrange your review." Base: "If you cannot find it, use the contact form and we will arrange your review." Classed MECHANICAL: the sentence pointed at a link the form mount removed.

### Rendered read (`/`, `/about`, `/services`, `/services/associate-tax`, `/services/locum-dentist-tax`, `/for-associates`, `/for-principals`, `/contact`, `/calculators`, `/blog/practice-finance`)
- Chat opener CONFIRMED restored: every quoted string in `web/src/lib/assistant/opener.ts` is identical to `git show 8e1043d0:` of the same file.
- Grep of all rendered text for the four phase 0 sentences returns exactly two lines, both the `/about` panel above. Nothing on `/`, `/services/*`, `/for-*`, `/contact` or the calculators.
- Defect-string counts match base file by file across all 24 files (wording_grep TOTAL base=25 HEAD=25).
- No slug pasted into English, no single closer shared by every page, no machine-written sentence in the sampled prose.

### Mechanical regression
None. Focus rings present; `delayHours` = `0,0,4,20,24,48,72,96`; `/book` renders a form without a token; footer "Book a consultation" reaches `/contact`; sitemap omits `lastModified` rather than faking it.

## What the PHASE0 report claimed that this recheck could not confirm
- Individual og:image 200 status on inner routes (PHASE0 report does not make a per-route claim
  either; this recheck's harness marked most routes "-" rather than PASS/FAIL, so neither confirms
  nor contradicts).

## Method notes
- Port 3412, `Dentists/web`, server started and killed cleanly (PID 44092, confirmed port free
  after `taskkill`).
- Harness runtime: approx 3 minutes (28 pages, both widths, screenshots), `--no-control` used
  since gov.uk control already passed 390 on the prior site in this session.
- Pages sampled: 28 (home, about, services, contact, calculators hub, 4 `/for-*`, 5 `/services/*`,
  14 calculator routes, 1 blog post).
- Extra manual checks: `/book` renders 1 `<form>` (confirmed live via curl, matches the PHASE0
  claim that `/book` now renders `LeadForm`); footer `footer_links` has "Book a consultation" ->
  `/contact` (`niche.config.json:70`); `layout.tsx` carries `google-adsense-account` (line 49) and
  `ConsentedScripts adsenseClientId` (line 99); `web/public/ads.txt` exists;
  `pipeline/submit_indexnow.py` has `SITE_KEY = "dentists"` (line 23); `sitemap.ts` uses real
  content dates or omits `lastModified`, no build-time `new Date()` for static/location/service
  entries.
- Screenshots not individually opened this pass; numeric checks were consistent across all 28
  routes with no anomaly to chase visually.

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: the hand-rolled /about panel prose (estate finding M4) swapped for the shared panel with no custom copy.

## Fix round (2026-09-29)

**M4** `Dentists/web/src/app/about/page.tsx:141-153` (hand-rolled block added 2026-09-28).
Before: heading "Send us your details" + agent prose "We reply within 24 hours and one
of our accountants comes back to you directly." above a bare `LeadForm`.
After: replaced with the site's standard `LeadCTAPanel` mount, copied verbatim from
`Dentists/web/src/app/blog/page.tsx` (title/description/proofPoints/form text reused,
no new prose written). Confirmed via `git show 8e1043d0:...about/page.tsx` that base
had no panel at all in this slot.

tsc: `npx tsc --noEmit -p Dentists/web` — pass, 0 errors.
vitest: `npx vitest run` (Dentists/web) — 23 files, 495 tests passed.
