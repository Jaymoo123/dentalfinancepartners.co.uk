# medical phase 0 recheck (2026-09-29)

Independent recheck of phase 0 and the wording reversal on the local build (HEAD `213e50ab`).
Read-only. Harness: shared `harness.mjs` (1280 + real 390 emulation, gov.uk control scrollWidth = 390).
Nothing deployed.

## Verdict
SAFE TO DEPLOY (mechanical side only); one cosmetic mobile issue and the focus-ring claim not confirmed.

## Numbers
| check | result | evidence |
|---|---|---|
| pages rendered | 25 at 1280, 25 at 390 | harness summary.md |
| lead form on every money page | 25/25 PASS, 1 or 2 forms per page | report.json |
| one form under each calculator result, no gate | 12/12 calculator routes, 2 forms, `calc_result_form` present, 0 `see_result`/`reveal`/`unlock` markup | wording_grep.txt (ResultGate section shows only comments/imports, no active gate wrap) |
| header CTA visible 1280 / hidden 390 | 25/25, 25/25 | summary.md "2 PASS" / "0 PASS" columns |
| scrollWidth 390 on every page | 25/25 PASS | summary.md, all rows sw390=390 |
| raw markup as text | 0 pages | summary.md, all PASS |
| focus ring on first form control | 0/25 PASS (harness reports FAIL, `outline: none`) — see Findings #1 | summary.md focus-ring column |
| submit / primary CTA contrast >= 4.5 | 25/25, flat 4.91 everywhere | summary.md |
| canonical self-referencing | 25/25 PASS | summary.md |
| sitemap lastModified real or omitted | PASS, 8 distinct dates, 0 dated "today" | harness sitemap line: `locs=148 lastmod=148 distinct=8 today=0`; confirmed real content dates in `sitemap.ts:13-22` (`CRO_WAVE`, `STATIC`, `WAVE1_DATE`, per-post `date`), no `new Date()` at render time |
| Organization node with parentOrganization | 25/25 PASS AccountingService | summary.md |
| Service / FAQPage / BreadcrumbList on segment + service pages | `/for-gps` = 7/1/1 matches estate reference exactly | curl grep on rendered `/for-gps`: 7x `"@type":"Service"`, 1x `"@type":"FAQPage"`, 1x `"@type":"BreadcrumbList"` |
| /llms.txt UTM tagged, /llms-full.txt, /ads.txt, og:image | llms.txt 200 utm=47/47 stub=false; llms-full 200; ads.txt 200 pub=true; og:image 200 on all sampled pages | harness header line |
| lead-nurture delayHours | `0,0,4,20,24,48,72,96,0,24,48,168` | wording_grep.txt; matches expected first eight exactly |
| defect-string count base vs HEAD | 25 vs 25, identical per-file | wording_grep.txt (13 files, all `n | n` matched, no DIFFERS flag) |
| phase-0 replacement strings at HEAD | 3 (all in `niche.config.json` sticky/secondary CTA strings, config only) | wording_grep.txt |
| tsc / vitest (if run) | not rerun this pass (PHASE0 report already ran clean: tsc 0 errors, 538/538 tests) | docs/medical/PHASE0_2026-09-28.md lines 214-216 |

## Findings (ranked; severity HIGH / MEDIUM / LOW; file:line; what the PHASE0 report claimed)
1. **MEDIUM — focus ring claim not confirmed.** PHASE0 report (lines 152-159) claims a real
   `:focus-visible` outline (2px, brand colour) was added to `LeadForm.tsx:13`,
   `DetailsForm.tsx:18`, `PremiumCalculator.tsx:69`, `ResourceGate.tsx:57`,
   `MedicalHealthCheckWizard.tsx:423,433`. The harness's scripted `.focus()` + computed-style
   check reports `outline-style: none` on every one of the 25 sampled pages (e.g. home:
   `FAIL none 3px rgb(0, 27, 61) / rgba(0, 0, 0, 0) 0px 0px 0px 0px`). Either the fix does not
   reach the first form control the harness targets, or it only fires on real keyboard `:focus-visible`
   and not the harness's programmatic focus — cannot distinguish from this pass; flag for the
   Opus/owner read rather than treat as disproven.
2. **LOW — chat widget auto-opens over the hero CTA at 390.** `home-390.png`: a chat bubble
   ("The quickest way to get a straight answer...") opens on load and visually covers the
   "Speak to a medical accountant" button text. Not a gate (no click required to dismiss the
   page), and the brief flags chat separately from gate findings, but it is a real overlap at
   the width that matters most. Not mentioned in the PHASE0 report.
3. **LOW — `/calculators` and non-`/for-*` hub pages carry 0 Service/FAQ/Breadcrumb nodes** (e.g.
   `/calculators` = 0/0/0, `/about` and `/contact` = 0/0/1). This matches the brief's scope
   (schema is for segment + service pages, not every hub) so not a defect, but noting since the
   summary table could be misread as a gap.

## Wording
Deterministic walk of `git diff 8e1043d0 HEAD -- Medical/web/src Medical/niche.config.json Medical/web/public/llms.txt` (15 files, 115+/143-). Rendered read of 9 routes against `next start -p 3511`.

| file | class |
|---|---|
| `app/layout.tsx`, `app/contact/page.tsx`, `public/ads.txt`, `next.config.ts`, `pipeline/submit_indexnow.py` | MECHANICAL (AdSense meta, og:image, ads.txt, IndexNow) |
| `app/page.tsx` (+`StickyCTA` mount) | MECHANICAL (component mount, existing config strings) |
| `components/forms/LeadForm.tsx`, `forms/DetailsForm.tsx`, `resources/ResourceGate.tsx`, `health-check/MedicalHealthCheckWizard.tsx`, `tools/premium/PremiumCalculator.tsx` (`inputCls`) | MECHANICAL (focus-visible ring classes only) |
| `components/tools/ResultGate.tsx`, `tools/CalculatorClient.tsx` | MECHANICAL (gate removal, owner 2026-09-27; changed strings are code comments) |
| `tests/port-guards.test.ts` | MECHANICAL (`see_result` cta id removed with the button that emitted it) |
| `components/tools/ResultCaptureForm.tsx` (new) | SURVIVING AGENT SENTENCES x3, below |
| `niche.config.json` | unchanged base..HEAD. The three "Free first call, then a fixed fee in writing" hits are BASE text (wording_grep: HEAD=3, base=3), not phase 0 |

### Surviving agent sentences
`Medical/web/src/components/tools/ResultCaptureForm.tsx` is a new file, but the surface it feeds (the capture under a calculator result) existed at base as `components/tools/premium/ResultGateModal.tsx`. Removing the gate is mechanical; its copy should have come across verbatim. Three of five strings were rewritten. `heading` and `submitLabel` ("Get my figure confirmed") do match base.

1. MEDIUM, line 22, `blurb`. HEAD: "A calculator gives the shape of the answer. Tell us your situation and one of our accountants will confirm your exact figure and the legitimate ways to reduce it, with no obligation." Base (`git show 8e1043d0:Medical/web/src/components/tools/premium/ResultGateModal.tsx:140`): "A calculator gives the shape of the answer. NHS pensions, the annual allowance taper and private-practice incorporation are unforgiving in the detail. Tell us your situation and one of our medical accountants who works with doctors will confirm your exact figure and the sensible next step. Enquiring commits you to nothing." Every medical-specific clause is gone. The HEAD text is also not Property's, which reads "a specialist will" (`Property/web/src/components/calculators/ResultCaptureForm.tsx:40`), so this is an agent positioning rewrite of a shared string, not a copy.
2. MEDIUM, line 24, `successText`. HEAD: "Sent. Check your email and phone now, we have just messaged you to arrange your free first call." Base: "Thanks. One of our medical accountants will contact you about your figure. Your result is below."
3. LOW, line 26, `messagePlaceholder`. HEAD: "...Tell us about your situation, rough figures, and what you're trying to work out..." Base: "...Tell us about your NHS pension situation or private practice, rough figures, and what you are trying to work out..." Also introduces the apostrophe contraction "you're" against the site's "you are".

Exposure is higher than at base: at base this copy sat inside a modal behind a reveal click; at HEAD it renders inline and always. Rendered on all five calculator-bearing routes sampled (`/`, `/for-gps`, `/for-locum-doctors`, `/calculators/locum-tax-calculator`, `/blog/locum-tax`).

### Rendered read (9 routes: `/`, `/about`, `/services`, `/for-gps`, `/for-locum-doctors`, `/contact`, `/free-practice-health-check`, `/calculators/locum-tax-calculator`, `/blog/locum-tax`)
- `/free-practice-health-check` CONFIRMED restored: "Free practice health check for UK doctors", "Free follow-up call (optional)", "an offer of a 30-minute scoping call", "a conversation with a medical specialist accountant on your actual figures". No "Free first call" swap on the page.
- No hit for "We reply within 24 hours...", "One of our accountants will call you within 24 hours", or "An accountant will call you then" on any route.
- Every "specialist partner network" hit is the exempt `leadConsentText` under the form, verbatim estate-wide.
- Segment prose reads in the site's voice and at base quality, e.g. `/for-locum-doctors`: "An accountant who sees locum doctors regularly gets all four right; one who does not usually gets at least one wrong."
- Only machine-written sentence found is the `ResultCaptureForm` blurb above.

### Mechanical regression
None. Focus rings present on every form control class; `StickyCTA` mounted on home; `delayHours` = `0,0,4,20,24,48,72,96` at both base and HEAD (Medical was already correct); `/free-practice-health-check` wizard diff is focus-ring only.

## What the PHASE0 report claimed that this recheck could not confirm
- The `:focus-visible` outline fix (Finding #1 above) — harness still measures `outline: none`.
- `/free-practice-health-check` copy changes and honesty fix: not in the harness's sampled page
  list this pass (harness sampled home/about/services/contact/calculators/for-*/one blog post);
  wording_grep confirms the file's defect-string count is unchanged base vs HEAD but did not
  independently re-read the rendered page.

## Method notes
- Port 3411, `Medical/web`, server started and killed cleanly (PID 57000, confirmed port free
  after `taskkill`).
- Harness runtime: approx 2.5 minutes (25 pages, both widths, screenshots).
- Pages sampled: 25 (home, about, services, contact, calculators hub, 8 `/for-*` segment pages,
  12 calculator routes, 1 blog post) plus llms.txt/llms-full.txt/ads.txt/robots.txt/sitemap.xml.
- Extra manual checks: `/book` renders 0 `<form` (by design, footer points at `/contact` which
  renders 1 `<form`, confirmed live via curl); home HTML has 0 occurrences of `NaN` (StatsCounter
  guard holds); `layout.tsx` carries `google-adsense-account` (line 50) and
  `ConsentedScripts adsenseClientId` (line 112); `web/public/ads.txt` exists;
  `pipeline/submit_indexnow.py` has `SITE_KEY = "medical"` (line 16).
- Screenshots read at 390: home only, full-page. Calculator and segment screenshots not
  individually opened this pass (numeric checks covered them; no anomaly flagged by the numbers
  to chase).
- gov.uk control scrollWidth = 390, trustworthy.

## Estate summariser note (2026-09-29)
Final status: SAFE AFTER FIXES.
Blocking item: the three rewritten ResultCaptureForm strings (estate finding M1) restored to the base ResultGateModal text, plus the focus-ring claim settled by a real keyboard check (U2).
